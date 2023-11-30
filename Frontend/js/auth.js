import { Router } from './class/Router.js';

const $btn = document.getElementById('log-in');

document.addEventListener('click', e => {
    if(e.target === $btn){
        e.preventDefault();
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;

        const info = {
            correo,
            password
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        };

        fetch(Router.getRuteApi('/auth/login'), requestOptions)
            .then(response => response.json())
            .then(res => {
                if(res.msg === 'ok'){
                    const token = res.token;
                    localStorage.setItem('x-token', token);

                    location.assign(Router.getRuteApp('/routes/admin.html'));
                }
            })
            .catch(error => console.log('error', error));
    }
});
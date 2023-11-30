import { Router } from "../class/Router.js";

export const validarToken = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('x-token');
        
        if(!token) {
            location.assign(Router.getRuteApp('/routes/login.html'));
            reject('Token no encontrado');
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'x-token': token
            }
        };

        fetch(Router.getRuteApi('/cultivos/access'), requestOptions)
            .then(res => res.json())
            .then(res => {
                if(res.msg !== 'ok'){
                    location.assign(Router.getRuteApp('/routes/login.html'));
                    reject('Error en la validación del token');
                } else {
                    resolve(res.msg);
                }
            })
            .catch(err => {
                location.assign(Router.getRuteApp('/routes/login.html'));
                reject(err);
            });
    });
}

import { Router } from "./Router.js";

export default class Post{
    constructor(){
        this.token = localStorage.getItem('x-token')
    }

    setHeaders(){
        const myHeaders = new Headers();
        myHeaders.append('x-token', this.token);
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        return myHeaders;
    }

    obtenerPosts(){
        return new Promise(async(resolve, reject) => {
            try {
                const requestOptions = {
                    method: 'GET'
                };
                  
                const response = await fetch(Router.getRuteApi('/posts/'), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    obtenerPostId(id){
        return new Promise(async(resolve, reject) => {
            try {
                const requestOptions = {
                    method: 'GET'
                };
                  
                const response = await fetch(Router.getRuteApi(`/posts/${id}`), requestOptions);
                const res = response.json();
        
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    crearPost(titulo, info){
        return new Promise(async (resolve, reject) => {
            try {
                const myHeaders = this.setHeaders();

                const raw = {
                    titulo,
                    info
                }

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(raw)
                };

                const response = await fetch(Router.getRuteApi('/posts/'), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    actualizarPost(id, titulo, info){
        return new Promise(async (resolve, reject) => {
            try {
                const myHeaders = this.setHeaders();

                const raw = {
                    titulo,
                    info
                }

                const requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(raw)
                };

                const response = await fetch(Router.getRuteApi(`/posts/${id}`), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        })
    }

    eliminarPost(id){
        return new Promise(async (resolve, reject) => {
            try {
                const myHeaders = this.setHeaders();

                const requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders
                };

                const response = await fetch(Router.getRuteApi(`/posts/${id}`), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }
}
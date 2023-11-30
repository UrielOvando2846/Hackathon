import { Router } from './Router.js';

export default class Categoria{
    constructor(){}

    crearCategoria(nombre){
        return new Promise(async (resolve, reject) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append('x-token', localStorage.getItem('x-token'));
                myHeaders.append('Content-Type', 'application/json; charset=utf-8');

                const data = { nombre };

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(data)
                };

                const response = await fetch(Router.getRuteApi('/categorias/'), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    obtenerCategorias(){
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = {
                    method: 'GET'
                };
                  
                const response = await fetch(Router.getRuteApi('/categorias/'), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    obtenerCategoriaId(id){
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = {
                    method: 'GET'
                };
                  
                const response = await fetch(Router.getRuteApi(`/categorias/${id}`), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    actualizarCategoria(id, nombre){
        return new Promise(async (resolve, reject) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("x-token", localStorage.getItem('x-token'));
                myHeaders.append('Content-Type', 'application/json; charset=utf-8');

                const data = { nombre };

                const requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(data)
                };

                const response = await fetch(Router.getRuteApi(`/categorias/update/${id}`), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    eliminarCategoria(id){
        return new Promise(async (resolve, reject) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("x-token", localStorage.getItem('x-token'));
                myHeaders.append('Content-Type', 'application/json; charset=utf-8');

                const requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders
                };

                const response = await fetch(Router.getRuteApi(`/categorias/delete/${id}`), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }
}
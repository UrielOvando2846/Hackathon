import { Router } from "./Router.js";

export default class Cultivo{
    constructor(){
        
    }

    crearCultivo(nombre, descripcion, condiciones_cultivo, cuidados_mantenimiento, fecha_siembra, fecha_cosecha, categoria, estados){
        return new Promise(async (resolve, reject) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append('x-token', localStorage.getItem('x-token'));
                myHeaders.append("content-type", "application/json; charset=utf-8");

                const data = {
                    nombre, 
                    descripcion,
                    condiciones_cultivo,
                    cuidados_mantenimiento,
                    fecha_siembra,
                    fecha_cosecha,
                    categoria,
                    estados
                }

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(data)
                  };

                const response = await fetch(Router.getRuteApi('/cultivos/create'), requestOptions);
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
                    method: 'GET',
                    redirect: 'follow'
                };
                  
                const response = await fetch(Router.getRuteApi('/categorias/'), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    obtenerCultivos(){
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                  
                const response = await fetch(Router.getRuteApi('/cultivos/'), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    obtenerCultivoId(id){
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                  
                const response = await fetch(Router.getRuteApi(`/cultivos/${id}`), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    actualizarCultivo(id, nombre, descripcion, condiciones_cultivo, cuidados_mantenimiento, fecha_siembra, fecha_cosecha, categoria, estados){
        return new Promise(async (resolve, reject) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append('x-token', localStorage.getItem('x-token'));
                myHeaders.append("content-type", "application/json; charset=utf-8");

                const data = {
                    nombre, 
                    descripcion,
                    condiciones_cultivo,
                    cuidados_mantenimiento,
                    fecha_siembra,
                    fecha_cosecha,
                    categoria,
                    estados
                }

                const requestOptions = {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: myHeaders
                };
                  
                const response = await fetch(Router.getRuteApi(`/cultivos/update/${id}`), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    eliminarCultivo(id){
        return new Promise(async(resolve, reject) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("x-token", localStorage.getItem('x-token'));

                const requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders
                };

                const response = await fetch(Router.getRuteApi(`/cultivos/delete/${id}`), requestOptions)
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }
}
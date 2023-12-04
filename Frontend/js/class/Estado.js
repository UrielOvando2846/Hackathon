import { Router } from './Router.js';

export default class Estado{
    constructor(){}

    obtenerEstados(){
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = {
                    method: 'GET'
                  };
                  
                const response = await fetch(Router.getRuteApi('/estados/'), requestOptions);
                const res = response.json();

                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }
}
import { validarToken } from './verify-token.js';
import { Router } from '../class/Router.js';

export const addLoader = async () => {
    if(location.href === (Router.getRuteApp('/routes/admin.html'))){
        try {
            await validarToken();
            document.getElementById('loader').classList.toggle('to-loader');
        } catch (error) {
            console.error('Error al validar el token:', error);
        }
    }
    window.addEventListener('load', e => {
        document.getElementById('loader').classList.toggle('to-loader');
    });
}
import { actualizarCategoria, crearCategoria, eliminarCategoria, loadCategorias } from './modules/categoria.js';
import { actualizarCultivo, crearCultivo, eliminarCultivo, loadFormCultivo, loadUpdateCultivo } from './modules/cultivo.js';
import { validarToken } from './modules/verify-token.js';

validarToken();
const d = document;

d.addEventListener('DOMContentLoaded', () => {
    const $btnCrearCultivo = d.getElementById('crear-cultivo-btn');
    const $btnActualizarCultivo = d.getElementById('actualizar-cultivo-btn');
    const $btnEliminarCultivo = d.getElementById('eliminar-cultivo-btn');

    const $btnCrearCategoria = d.getElementById('crear-categoria-btn');
    const $btnActualizarCategoria = d.getElementById('actualizar-categoria-btn');
    const $btnEliminarCategoria = d.getElementById('eliminar-categoria-btn');

    loadFormCultivo('form-crear-cultivo');
    loadUpdateCultivo();

    loadCategorias();

    d.addEventListener('click', e => {

        if(e.target === $btnCrearCultivo){
            e.preventDefault();
            crearCultivo($btnCrearCultivo);
        }
        if(e.target === $btnActualizarCultivo){
            e.preventDefault();
            actualizarCultivo($btnActualizarCultivo);
        }
        if(e.target === $btnEliminarCultivo){
            e.preventDefault();
            eliminarCultivo($btnActualizarCultivo);
        }

        if(e.target === $btnCrearCategoria){
            e.preventDefault();
            crearCategoria($btnCrearCategoria);
        }
        if(e.target === $btnActualizarCategoria){
            e.preventDefault();
            actualizarCategoria($btnActualizarCategoria);
        }
        if(e.target === $btnEliminarCategoria){
            e.preventDefault();
            eliminarCategoria($btnActualizarCategoria);
        }
    });
});
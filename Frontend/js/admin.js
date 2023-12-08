import { actualizarCategoria, crearCategoria, eliminarCategoria, loadCategorias } from './modules/categoria.js';
import { actualizarCultivo, crearCultivo, eliminarCultivo, loadFormCultivo, loadUpdateCultivo } from './modules/cultivo.js';
import { addLoader } from './modules/loader.js';
import { actualizarPost, crearPost, eliminarPost, loadPosts } from './modules/post.js';
import { validarToken } from './modules/verify-token.js';

addLoader();
const d = document;

d.addEventListener('DOMContentLoaded', () => {
    const $btnCrearCultivo = d.getElementById('crear-cultivo-btn');
    const $btnActualizarCultivo = d.getElementById('actualizar-cultivo-btn');
    const $btnEliminarCultivo = d.getElementById('eliminar-cultivo-btn');

    const $btnCrearCategoria = d.getElementById('crear-categoria-btn');
    const $btnActualizarCategoria = d.getElementById('actualizar-categoria-btn');
    const $btnEliminarCategoria = d.getElementById('eliminar-categoria-btn');

    const $btnCrearPost = d.getElementById('crear-post-btn');
    const $btnActualizarPost = d.getElementById('actualizar-post-btn');
    const $btnEliminarPost = d.getElementById('eliminar-post-btn');

    const $btnLogOut = d.getElementById('logout');
    const $btnLogOutIcon = d.querySelector('#logout i');

    loadFormCultivo('form-crear-cultivo');
    loadUpdateCultivo();

    loadCategorias();

    loadPosts();

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

        if(e.target === $btnCrearPost){
            e.preventDefault();
            crearPost($btnCrearPost);
        }
        if(e.target === $btnActualizarPost){
            e.preventDefault();
            actualizarPost($btnActualizarPost);
        }
        if(e.target === $btnEliminarPost){
            e.preventDefault();
            eliminarPost($btnActualizarPost);
        }

        if(e.target === $btnLogOut || e.target === $btnLogOutIcon){
            localStorage.clear();
            location.reload();
        }
    });
});
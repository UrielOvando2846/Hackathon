import Categoria from '../class/Categoria.js';
import Spin from '../class/Spinner.js';
import { loadFormCultivo, loadUpdateCultivo } from './cultivo.js';
import { createLi } from '../helpers/create-elements.js';
import { createMsg, messageNoSelected } from '../helpers/msg.js';
import { removeMsgBox } from '../helpers/remove-elements.js';

const d = document;

const categoria = new Categoria();

const loadCategorias = async () => {
    const { total, categorias } = await categoria.obtenerCategorias();
    const $ul = d.querySelector('.list-categoria');

    const $categoriasBox = d.querySelector('#obtener-categorias ul');

    d.getElementById('title-actualizar-categoria').textContent = '';
    $categoriasBox.innerHTML = '';
    
    if(total > 0){
        d.getElementById('seleccionar-categoria-actualizar').textContent = 'Selecciona una categoría';
        const $fragment = d.createDocumentFragment();
        categorias.forEach(cat => {
            $fragment.appendChild(createLi(cat._id, cat.nombre, 'data-idcategoria'));
        });

        $ul.appendChild($fragment);

        const $categorias = d.querySelectorAll('#obtener-categorias ul li');

        $categorias.forEach(cat => {
            cat.addEventListener('click', async e => {
                const id = e.target.dataset.idcategoria;
                const { categoria: categoriaId } = await categoria.obtenerCategoriaId(id);

                const $form = d.getElementById('form-actualizar-categoria');
                $form.setAttribute('data-id', categoriaId._id);

                const $h3Title = d.getElementById('title-actualizar-categoria');
                $h3Title.textContent = categoriaId.nombre;
                $h3Title.style.width = '100%';
                $h3Title.style.textAlign = 'center';
                $h3Title.style.textTransform = 'Capitalize';

                const $nombre = d.getElementById('nombre-categoria-actualizado');
                $nombre.value = categoriaId.nombre;
            });
        });
    }else{
        d.getElementById('seleccionar-categoria-actualizar').textContent = 'No existen categorías';
    }
}

const crearCategoria = async ($btnCrearCategoria) => {
    removeMsgBox('.categoria');

    const nombre = d.getElementById('nombre-categoria').value.toLowerCase();

    Spin.newSpin('.spin-categoria');
    const res = await categoria.crearCategoria(nombre);
    Spin.destroySpin();

    createMsg($btnCrearCategoria, res, '.categorias', () => {
        d.getElementById('form-crear-categoria').reset();
        loadCategorias();
        loadFormCultivo('form-actualizar-cultivo');
        loadFormCultivo('form-crear-cultivo');
    });
}

const actualizarCategoria = async ($btnActualizarCategoria) => {
    removeMsgBox('.categorias');

    const id = d.getElementById('form-actualizar-categoria').dataset.id;
    if(!messageNoSelected(id, $btnActualizarCategoria, 'Aún no has seleccionado una categoría para actualizar')) return;

    const nombre = d.getElementById('nombre-categoria-actualizado').value;

    Spin.newSpin('#form-actualizar-categoria .spin-categoria-actualizada');
    const res = await categoria.actualizarCategoria(id, nombre);
    Spin.destroySpin();

    createMsg($btnActualizarCategoria, res, '.categorias', () => {
        d.getElementById('form-actualizar-categoria').reset();
        d.getElementById('form-actualizar-categoria').removeAttribute('data-id');
        loadCategorias();
        loadFormCultivo('form-actualizar-cultivo');
        loadFormCultivo('form-crear-cultivo');
    });
}

const eliminarCategoria = async ($btnActualizarCategoria) => {
    removeMsgBox('.categorias')

    const id = d.getElementById('form-actualizar-categoria').dataset.id;
    if(!messageNoSelected(id, $btnActualizarCategoria, 'Aún no has seleccionado una categoría para eliminar')) return;

    Spin.newSpin('#form-actualizar-categoria .spin-categoria-actualizada');
    const res = await categoria.eliminarCategoria(id);
    Spin.destroySpin();

    createMsg($btnActualizarCategoria, res, '.categorias', () => {
        d.getElementById('form-actualizar-categoria').reset();
        d.getElementById('form-actualizar-categoria').removeAttribute('data-id');
        loadCategorias();
        loadFormCultivo('form-actualizar-cultivo');
        loadFormCultivo('form-crear-cultivo');
        loadUpdateCultivo();
    });
}

export {
    actualizarCategoria,
    crearCategoria, 
    eliminarCategoria,
    loadCategorias
}
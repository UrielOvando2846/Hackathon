import Categoria from '../class/Categoria.js';
import Spin from '../class/Spinner.js';
import { loadFormCultivo } from './cultivo.js';

const d = document;

const categoria = new Categoria();

const createDivMsg = (className, msg) => {
    const $div = d.createElement('div');
    $div.classList.add(className, 'all-columns', 'msg');
    $div.innerHTML = msg;
    
    return $div;
}

const createLiCategoria = (id, nombre) => {
    const $li = d.createElement('li');
    $li.textContent = nombre;
    $li.setAttribute('data-idcategoria', id);

    return $li;
}

const loadCategorias = async () => {
    const { total, categorias } = await categoria.obtenerCategorias();
    const $ul = d.querySelector('.list-categoria');

    const $categoriasBox = d.querySelector('#obtener-categorias ul');

    d.getElementById('title-actualizar-categoria').textContent = '';
    $categoriasBox.innerHTML = '';
    
    if(total > 0){
        const $fragment = d.createDocumentFragment();
        categorias.forEach(cat => {
            $fragment.appendChild(createLiCategoria(cat._id, cat.nombre));
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
    }
}

const crearCategoria = async ($btnCrearCategoria) => {
    const $msgBox = d.querySelector('.categorias .msg');
    if($msgBox) $msgBox.remove();

    const nombre = d.getElementById('nombre-categoria').value.toLowerCase();

    Spin.newSpin('.spin-categoria');
    const res = await categoria.crearCategoria(nombre);
    Spin.destroySpin();

    let $msg;
    if(res.errors){
        let errores = '';
        res.errors.forEach(err => {
            errores += `- ${err.msg} <br>`;
        });

        $msg = createDivMsg('error', errores);
    }else{
        $msg = createDivMsg('success', res.msg);
        d.getElementById('form-crear-categoria').reset();
        loadFormCultivo('form-actualizar-cultivo');
        loadFormCultivo('form-crear-cultivo');
    }
    
    $btnCrearCategoria.insertAdjacentElement('beforebegin', $msg);

    setTimeout(() => {
        d.querySelector('.categorias .msg').remove();
    }, 3000);
}

const actualizarCategoria = async ($btnActualizarCategoria) => {
    const $msgBox = d.querySelector('.categorias .msg');
    if($msgBox) $msgBox.remove();

    const id = d.getElementById('form-actualizar-categoria').dataset.id;
    if(!id) {
        $btnActualizarCategoria.insertAdjacentElement('beforebegin', createDivMsg('error', 'Aún no has seleccionado una categoría para actualizar'));

        setTimeout(() => {
            d.querySelector('div .msg').remove();
        }, 3000);

        return false;
    }

    const nombre = d.getElementById('nombre-categoria-actualizado').value;

    Spin.newSpin('#form-actualizar-categoria .spin-categoria-actualizada');
    const res = await categoria.actualizarCategoria(id, nombre);
    Spin.destroySpin();

    let $msg;
    if(res.errors){
        let errores = '';
        res.errors.forEach(err => {
            errores += `- ${err.msg} <br>`;
        });

        $msg = createDivMsg('error', errores);
    }else{
        $msg = createDivMsg('success', res.msg);
        d.getElementById('form-actualizar-categoria').reset();
        d.getElementById('form-actualizar-categoria').removeAttribute('data-id');
        loadCategorias();
        loadFormCultivo('form-actualizar-cultivo');
        loadFormCultivo('form-crear-cultivo');
    }
    
    $btnActualizarCategoria.insertAdjacentElement('beforebegin', $msg);

    setTimeout(() => {
        d.querySelector('.categorias .msg').remove();
    }, 3000);
}

const eliminarCategoria = async ($btnActualizarCategoria) => {
    const $msgBox = d.querySelector('.categorias .msg');
    if($msgBox) $msgBox.remove();

    const id = d.getElementById('form-actualizar-categoria').dataset.id;
    if(!id) {
        $btnActualizarCategoria.insertAdjacentElement('beforebegin', createDivMsg('error', 'Aún no has seleccionado una categoría para eliminar'));

        setTimeout(() => {
            d.querySelector('div .msg').remove();
        }, 3000);

        return false;
    }

    Spin.newSpin('#form-actualizar-categoria .spin-categoria-actualizada');
    const res = await categoria.eliminarCategoria(id);
    Spin.destroySpin();

    let $msg;
    if(res.errors){
        let errores = '';
        res.errors.forEach(err => {
            errores += `- ${err.msg} <br>`;
        });

        $msg = createDivMsg('error', errores);
    }else{
        $msg = createDivMsg('success', res.msg);
        d.getElementById('form-actualizar-categoria').reset();
        d.getElementById('form-actualizar-categoria').removeAttribute('data-id');
        loadCategorias();
        loadFormCultivo('form-actualizar-cultivo');
        loadFormCultivo('form-crear-cultivo');
    }
    
    $btnActualizarCategoria.insertAdjacentElement('beforebegin', $msg);

    setTimeout(() => {
        d.querySelector('.categorias .msg').remove();
    }, 3000);
}

export {
    actualizarCategoria,
    crearCategoria, 
    eliminarCategoria,
    loadCategorias
}
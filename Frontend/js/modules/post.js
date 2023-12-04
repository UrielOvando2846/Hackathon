import Spin from '../class/Spinner.js';
import Post from '../class/Post.js';
import { createMsg, messageNoSelected } from '../helpers/msg.js';
import { removeMsgBox } from '../helpers/remove-elements.js';
import { createLi } from '../helpers/create-elements.js';

const d = document;
const post = new Post();

const loadPosts = async () => {
    const { total, posts } = await post.obtenerPosts();
    const $ul = d.querySelector('.list-post');

    const $postsBox = d.querySelector('#obtener-posts ul');

    d.getElementById('title-actualizar-post').textContent = '';
    $postsBox.innerHTML = '';

    if(total > 0){
        d.getElementById('seleccionar-post-actualizar').textContent = 'Selecciona un post';
        const $fragment = d.createDocumentFragment();
        posts.forEach(post => {
            $fragment.appendChild(createLi(post._id, post.titulo, 'data-idpost'));
        });

        $ul.appendChild($fragment);

        const $posts = d.querySelectorAll('#obtener-posts ul li');

        $posts.forEach(pst => {
            pst.addEventListener('click', async e => {
                const id = e.target.dataset.idpost;
                const { post: postId } = await post.obtenerPostId(id);

                const $form = d.getElementById('form-actualizar-post');
                $form.setAttribute('data-id', postId._id);

                const $h3Title = d.getElementById('title-actualizar-post');
                $h3Title.textContent = postId.titulo;
                $h3Title.style.width = '100%';
                $h3Title.style.textAlign = 'center';
                $h3Title.style.textTransform = 'Capitalize';

                const $titulo = d.getElementById('titulo-post-actualizado');
                $titulo.value = postId.titulo;

                const $info = d.getElementById('info-actualizada');
                $info.value = postId.info;
            });
        });
    }else{
        d.getElementById('seleccionar-post-actualizar').textContent = 'No existen posts :(';
    }
}

const crearPost = async ($btnCrearPost) => {
    removeMsgBox('.posts');

    const titulo = d.getElementById('titulo-post').value.toLowerCase();
    const info = d.getElementById('info').value;

    Spin.newSpin('.spin-post');
    const res = await post.crearPost(titulo, info);
    Spin.destroySpin();

    createMsg($btnCrearPost, res, '.posts', () => {
        d.getElementById('form-crear-post').reset();
        loadPosts();
    });
}

const actualizarPost = async ($btnActualizarPost) => {
    removeMsgBox('.posts');

    const id = d.getElementById('form-actualizar-post').dataset.id;
    if(!messageNoSelected(id, $btnActualizarPost, 'Aún no has seleccionado un post para actualizar')) return;

    const titulo = d.getElementById('titulo-post-actualizado').value;
    const info = d.getElementById('info-actualizada').value;

    Spin.newSpin('#form-actualizar-post .spin-post-actualizado');
    const res = await post.actualizarPost(id, titulo, info);
    Spin.destroySpin();

    createMsg($btnActualizarPost, res, '.posts', () => {
        d.getElementById('form-actualizar-post').reset();
        d.getElementById('form-actualizar-post').removeAttribute('data-id');
        loadPosts();
    });
}

const eliminarPost = async ($btnActualizarPost) => {
    removeMsgBox('.posts')

    const id = d.getElementById('form-actualizar-post').dataset.id;
    if(!messageNoSelected(id, $btnActualizarPost, 'Aún no has seleccionado un post para eliminar')) return;

    Spin.newSpin('#form-actualizar-post .spin-post-actualizado');
    const res = await post.eliminarPost(id);
    Spin.destroySpin();

    createMsg($btnActualizarPost, res, '.posts', () => {
        d.getElementById('form-actualizar-post').reset();
        d.getElementById('form-actualizar-post').removeAttribute('data-id');
        loadPosts();
    });
}

export {
    loadPosts,
    crearPost,
    actualizarPost,
    eliminarPost
}
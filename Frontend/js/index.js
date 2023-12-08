import Post from './class/Post.js';
import { getRandomAnimation } from './helpers/animation-scroll.js';
import { addLoader } from './modules/loader.js';

addLoader();
const d = document;

const post = new Post();

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;
    const scrollTop = window.pageYOffset;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    const scrolled = window.scrollY;

    if(scrolled >= windowHeight){
        const $progressBar = document.getElementById('progress-bar');
        if(!$progressBar.classList.contains('show')){
            $progressBar.classList.add('show');
        }
    }

    if(scrolled <= windowHeight){
        const $progressBar = document.getElementById('progress-bar');
        if($progressBar.classList.contains('show')){
            $progressBar.classList.remove('show');
        }
    }

    const $progressIndicator = document.getElementById('progress-indicator');

    if(scrollPercent > 90){
        $progressIndicator.style.backgroundColor = '#ff5722';
    }else{
        $progressIndicator.style.backgroundColor = '#5da8a0';
    }

    const progressHeight = scrollPercent > 100 ? 100 : scrollPercent;
    $progressIndicator.style.height = `${progressHeight}%`;
});

const $posts = d.getElementById('posts');

post.obtenerPosts()
    .then(({ total, posts }) => {
        if(total > 0){
            const $fragment = d.createDocumentFragment();
            posts.forEach(pst => {
                const $post = d.createElement('article');
                $post.setAttribute('data-aos', getRandomAnimation('fade'));
                $post.classList.add('post');

                const $h4 = d.createElement('h4');
                $h4.textContent = pst.titulo;

                const $info = d.createElement('p');
                $info.textContent = pst.info;

                $post.appendChild($h4);
                $post.appendChild($info);

                $fragment.appendChild($post);
            });

            $posts.appendChild($fragment);
        }
    })
    .catch( console.log );
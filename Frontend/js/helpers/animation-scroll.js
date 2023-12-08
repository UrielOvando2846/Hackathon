const animations = {
    fade: [
        'fade-up',
        'fade-down',
        'fade-right',
        'fade-left',
        'fade-up-right',
        'fade-up-left',
        'fade-down-right',
        'fade-down-left'
    ],
    flip: [
        'flip-left',
        'flip-right',
        'flip-up',
        'flip-down'
    ],
    zoom: [
        'zoom-in',
        'zoom-in-up',
        'zoom-in-down',
        'zoom-in-left',
        'zoom-in-right',
        'zoom-out',
        'zoom-out-up',
        'zoom-out-down',
        'zoom-out-right',
        'zoom-out-left'
    ]
}

const random = (len) =>  Math.floor(Math.random() * len);

const getRandomFade = () =>  animations.fade[random(animations.fade.length)];

const getRandomFlip = () => animations.flip[random(animations.flip.length)];

const getRandomZoom = () => animations.zoom[random(animations.zoom.length)];

const getRandomAnimation = (type) => {
    if(type === 'fade'){
        return getRandomFade();
    }else if(type === 'flip'){
        return getRandomFlip();
    }else if(type === 'zoom'){
        return getRandomZoom();
    }else{
        console.log('Animación no exite');
    }
}

export {
    getRandomAnimation
}
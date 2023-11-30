const $spin = document.createElement('div');

export default class Spin{
    static newSpin(container){
        $spin.classList.add('lds-facebook');

        for (let i = 0; i < 3; i++) {
            const $childDiv = document.createElement('div');
            $spin.appendChild($childDiv);
        }

        document.querySelector(container).appendChild($spin);
    }

    static destroySpin(){
        $spin.remove();
    }
}
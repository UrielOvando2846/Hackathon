import { createDivMsg } from "./create-elements.js";

const d = document;

const createMsg = ($btn, res, selector, callback) => {
    let $msg;

    if(res.errors){
        let errores = '';
        res.errors.forEach(err => {
            errores += `- ${err.msg} <br>`;
        });

        $msg = createDivMsg('error', errores);
    }else{
        $msg = createDivMsg('success', res.msg);
        callback();
    }
    
    $btn.insertAdjacentElement('beforebegin', $msg);

    setTimeout(() => {
        d.querySelector(selector + ' .msg').remove();
    }, 3000);
}

const messageNoSelected = (id, $btn, msg) => {
    if(!id) {
        $btn.insertAdjacentElement('beforebegin', createDivMsg('error', msg));

        setTimeout(() => {
            d.querySelector('div .msg').remove();
        }, 3000);

        return false;
    }else{
        return true;
    }
}

export {
    createMsg,
    messageNoSelected
}
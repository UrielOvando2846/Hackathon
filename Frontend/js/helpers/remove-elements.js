const d = document;

const removeMsgBox = (selector) => {
    const $msgBox = d.querySelector(selector + ' .msg');
    if($msgBox) $msgBox.remove();
}

export {
    removeMsgBox
}
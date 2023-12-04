const d = document;

const createDivMsg = (className, msg) => {
    const $div = d.createElement('div');
    $div.classList.add(className, 'all-columns', 'msg');
    $div.innerHTML = msg;
    
    return $div;
}

const createLi = (id, nombre, dataAttribute) => {
    const $li = d.createElement('li');
    $li.textContent = nombre;
    $li.setAttribute(dataAttribute, id);

    return $li;
}

const createSelectOption = nombre => {
    const $option = d.createElement('option');
    $option.textContent = nombre;
    $option.value = nombre;

    return $option;
}

const createInput = (placeholderName, classText) => {
    const $input = d.createElement('input');
    classText.forEach(nameClass => $input.classList.add(nameClass));
    
    $input.type = 'text';
    $input.placeholder = placeholderName;
    $input.style.marginTop = '7px';

    return $input;
}

const createDivAndCheck = (nombre, code) => {
    const $div = d.createElement('div');
    $div.classList.add('check');

    const $label = d.createElement('label');
    $label.textContent = nombre;
    
    const $input = d.createElement('input');
    $input.value = code;
    $input.type = 'checkbox';

    $div.appendChild($label);
    $div.appendChild($input);

    return $div;
}

export {
    createDivAndCheck,
    createDivMsg,
    createInput,
    createLi,
    createSelectOption
}
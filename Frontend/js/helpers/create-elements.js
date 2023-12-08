import { getRandomAnimation } from './animation-scroll.js';

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

const createLiMenu = (iconClassCategoria, categoria, items) => {
    const $listContainer = document.createElement('li');
    $listContainer.classList.add('list-container');

    const $listMenu = document.createElement('div');
    $listMenu.classList.add('align-li', 'list-menu', 'anim-bottom-menu', 'to-center');

    const $iconCategoria = document.createElement('i');
    iconClassCategoria.forEach(el => $iconCategoria.classList.add(el));

    const $nameGroup = document.createElement('p');
    $nameGroup.classList.add('name-group');
    $nameGroup.setAttribute('id', categoria);
    $nameGroup.textContent = categoria;
    $nameGroup.style.textTransform = 'Capitalize';

    const $chevronIcon = document.createElement('i');
    $chevronIcon.classList.add('fa-solid', 'fa-chevron-right');

    const $listDinamic = document.createElement('ul');
    $listDinamic.classList.add('list-dinamic');

    items.forEach(item => {
        const $listItem = document.createElement('li');
        $listItem.classList.add('align-li', 'item-group');

        const $seedlingIcon = document.createElement('i');
        $seedlingIcon.classList.add('fa-solid', 'fa-seedling');

        const $itemName = document.createElement('p');
        $itemName.classList.add('item');
        $itemName.textContent = item.nombre;
        $itemName.setAttribute('data-id', item.id);
        $itemName.style.textTransform = 'Capitalize';

        $listItem.appendChild($seedlingIcon);
        $listItem.appendChild($itemName);
        $listDinamic.appendChild($listItem);
    });

    $listMenu.appendChild($iconCategoria);
    $listMenu.appendChild($nameGroup);
    $listMenu.appendChild($chevronIcon);

    $listContainer.appendChild($listMenu);
    $listContainer.appendChild($listDinamic);

    return $listContainer;
}

const createStructureInfoCultivo = (nombre, categoria, descripcion, condiciones, cuidados, estados) => {
    const $div = d.createElement('div');
    $div.classList.add('box-info-cultivo');

    const $h2 = d.createElement('h2');
    $h2.classList.add('title-cultivo-info');
    $h2.textContent = nombre;
    $h2.style.textTransform = 'capitalize';

    const $categoria = d.createElement('p');
    $categoria.classList.add('categoria-info');
    $categoria.innerHTML = `<b>Categoría</b>: ${categoria}`;
    $categoria.style.textTransform = 'capitalize'

    const $descripcion = d.createElement('p');
    $descripcion.classList.add('descripcion-info');
    $descripcion.innerHTML = `<b>Descripción</b>: ${descripcion}`;

    const $condicionesCultivoUl = d.createElement('ul');
    $condicionesCultivoUl.classList.add('condiciones-cultivo-info');
    $condicionesCultivoUl.innerHTML = `<b><p>Condiciones para el cutivo:</p></b>${condiciones}`;

    const $cuidadosCultivoUl = d.createElement('ul');
    $cuidadosCultivoUl.classList.add('cuidados-cultivo-info');
    $cuidadosCultivoUl.innerHTML = `<b><p>Cuidados y Mantenimiento para el cultivo:</p></b>${cuidados}`;

    $div.setAttribute('data-aos', getRandomAnimation('fade'));

    $div.appendChild($h2);
    $div.appendChild($categoria);

    if(estados){
        const $ul = d.createElement('ul');
        $ul.classList.add('ul-estados');

        const $p = d.createElement('p');
        $p.textContent = 'Estados recomendados para sembrar el cultivo:';
        $p.style.fontWeight = 'bold';

        $div.appendChild($p)

        estados.forEach(el => {
            const $li = d.createElement('li');
            $li.textContent = el;

            $ul.appendChild($li);
        });

        $div.appendChild($ul);
    }

    $div.appendChild($descripcion);
    $div.appendChild($condicionesCultivoUl);
    $div.appendChild($cuidadosCultivoUl);

    return $div;
}

export {
    createDivAndCheck,
    createDivMsg,
    createInput,
    createLi,
    createSelectOption,
    createLiMenu,
    createStructureInfoCultivo
}
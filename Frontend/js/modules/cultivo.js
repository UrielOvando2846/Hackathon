const d = document;
import Cultivo from '../class/Cultivo.js';
import Spin from '../class/Spinner.js';

const cultivo = new Cultivo();

const createLiCultivo = (id, nombre) => {
    const $li = d.createElement('li');
    $li.textContent = nombre;
    $li.setAttribute('data-idcultivo', id);

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

const createDivMsg = (className, msg) => {
    const $div = d.createElement('div');
    $div.classList.add(className, 'all-columns', 'msg');
    $div.innerHTML = msg;
    
    return $div;
}

const loadFormCultivo = async (id) => {
    const $addCondition = d.querySelector(`#${id} .add-condition`);
    const $deleteCondition = d.querySelector(`#${id} .delete-condition`);
    
    const $addCuidado = d.querySelector(`#${id} .add-cuidado`);
    const $deleteCuidado = d.querySelector(`#${id} .delete-cuidado`);

    const $select = d.querySelector(`#${id} .categoria-cultivo`);
    $select.innerHTML = '';
    
    const { categorias } = await cultivo.obtenerCategorias();
    
    const $fragment = d.createDocumentFragment();
    const $optionEmpty = d.createElement('option');
    $optionEmpty.value = 'empty';
    $optionEmpty.textContent = '-- Seleccionar --';

    $fragment.appendChild($optionEmpty);

    categorias.forEach(cat => {
        $fragment.appendChild(createSelectOption(cat.nombre));
    });
    
    $select.appendChild($fragment);

    d.addEventListener('click', e => {
        if(e.target === $addCondition){
            e.preventDefault();
            const $input = createInput('Condiciones para el cultivo', ['condition-option', 'new-option']);
            $addCondition.insertAdjacentElement('beforebegin', $input);
        }

        if(e.target === $deleteCondition){
            e.preventDefault();
            const options = d.querySelectorAll('.new-option');
            try{
                options[options.length-1].remove();
            }catch{}
        }

        if(e.target === $addCuidado){
            e.preventDefault();
            const $input = createInput('Cuidado / Mantenimiento', ['cuidado-option', 'new-option-cuidado']);
            $addCuidado.insertAdjacentElement('beforebegin', $input);
        }

        if(e.target === $deleteCuidado){
            e.preventDefault();
            const options = d.querySelectorAll('.new-option-cuidado');
            try{
                options[options.length-1].remove();
            }catch{}
        }
    });
}

const loadUpdateCultivo = async () => {
    const { cultivos, total } = await cultivo.obtenerCultivos();
    const $cultivosBox = d.querySelector('#obtener-cultivos ul');

    d.getElementById('title-actualizar-cultivo').textContent = '';
    $cultivosBox.innerHTML = '';

    loadFormCultivo('form-actualizar-cultivo');
    
    if(total > 0){
        d.getElementById('seleccionar-cultivo-actualizar').textContent = '';
        const $fragment = d.createDocumentFragment();

        cultivos.forEach(el => {
            $fragment.appendChild(createLiCultivo(el._id, el.nombre));
        });

        $cultivosBox.appendChild($fragment);

        const $cultivos = d.querySelectorAll('#obtener-cultivos ul li');

        $cultivos.forEach(el => {
            el.addEventListener('click', async e => {
                const id = e.target.dataset.idcultivo;
                
                const cultivoId = await cultivo.obtenerCultivoId(id);
                const $form = d.getElementById('form-actualizar-cultivo');
                $form.setAttribute('data-id', cultivoId.cultivo._id);
                
                const $h3Title = d.getElementById('title-actualizar-cultivo');
                $h3Title.textContent = cultivoId.cultivo.nombre;
                $h3Title.style.width = '100%';
                $h3Title.style.textAlign = 'center';
                $h3Title.style.textTransform = 'Capitalize';

                const $nombre = d.getElementById('nombre-cultivo-actualizado');
                const $descripcion = d.getElementById('descripcion-actualizado');

                const $fechaSiembraInicio = d.getElementById('fecha-siembra-inicio-actualizado');
                const $fechaSiembraFin = d.getElementById('fecha-siembra-fin-actualizado');
    
                const $fechaCosechaInicio = d.getElementById('fecha-cosecha-inicio-actualizado');
                const $fechaCosechaFin = d.getElementById('fecha-cosecha-fin-actualizado');

                const $categoria = d.querySelector('#form-actualizar-cultivo .categoria-cultivo');

                $nombre.value = cultivoId.cultivo.nombre;
                $descripcion.value = cultivoId.cultivo.descripcion;

                const extraerInfo = () => {
                    let parserCondiciones = new DOMParser();
                    let docCondiciones = parserCondiciones.parseFromString(cultivoId.cultivo.condiciones_cultivo, 'text/html');
                    let liElementsCondiciones = docCondiciones.querySelectorAll('li');
                    let textArrayCondiciones = Array.from(liElementsCondiciones).map(el => el.textContent);

                    let parserCuidados = new DOMParser();
                    let docCuidados = parserCuidados.parseFromString(cultivoId.cultivo.cuidados_mantenimiento, 'text/html');
                    let liElementsCuidados = docCuidados.querySelectorAll('li');
                    let textArrayCuidados = Array.from(liElementsCuidados).map(el => el.textContent);

                    return {
                        textArrayCondiciones,
                        textArrayCuidados
                    };
                }

                const { textArrayCondiciones, textArrayCuidados } = extraerInfo();

                const condicionesOpciones = d.querySelectorAll('#form-actualizar-cultivo .new-option');
                condicionesOpciones.forEach(el => el.remove());

                const cuidadosOpciones = d.querySelectorAll('#form-actualizar-cultivo .new-option-cuidado');
                cuidadosOpciones.forEach(el => el.remove());

                d.querySelector('#condiciones-contenedor-actualizado input').value = '';
                d.querySelector('#cuidados-mantenimiento-actualizado input').value = '';

                const asignarInfoInputs = (id, placeholder, classList, arr, classSelect, firstContainer) => {
                    const $addCondition = d.querySelector(`#${id} .${classSelect}`);
                    arr.forEach((el, i) => {
                        if(i === 0){
                            const $condiciones = d.getElementById(firstContainer);
                            $condiciones.querySelector('input').value = '';
                            $condiciones.querySelector('input').value = el;
                        }else{
                            const $input = createInput(placeholder, classList);
                            $input.value = el;
                            $addCondition.insertAdjacentElement('beforebegin', $input);
                        }
                    });
                }

                asignarInfoInputs('form-actualizar-cultivo', 'Condición para el cultivo', ['condition-option', 'new-option'], textArrayCondiciones, 'add-condition', 'condiciones-contenedor-actualizado');
                asignarInfoInputs('form-actualizar-cultivo', 'Cuidado / Mantenimiento', ['cuidado-option', 'new-option-cuidado'], textArrayCuidados, 'add-cuidado', 'cuidados-mantenimiento-actualizado');

                const asignarFecha = (contenedor, fecha) => {
                    const fechaAsign = new Date(fecha);
                    const year = fechaAsign.getFullYear();
                    const monthArr = fechaAsign.getMonth();
                    const dayArr = fechaAsign.getDate();

                    const month = monthArr + 1;
                    const day = ((dayArr + 1) > 31) ? '01' : dayArr+1;

                    contenedor.value = `${year}-${ (month < 10) ? '0' + month : month }-${ ((day < 10) && (day !== '01') ) ? '0'+day : day }`;
                }

                asignarFecha($fechaSiembraInicio, cultivoId.cultivo.fecha_siembra.inicio);
                asignarFecha($fechaSiembraFin, cultivoId.cultivo.fecha_siembra.fin);

                asignarFecha($fechaCosechaInicio, cultivoId.cultivo.fecha_cosecha.inicio);
                asignarFecha($fechaCosechaFin, cultivoId.cultivo.fecha_cosecha.fin);

                for (let i = 0; i < $categoria.options.length; i++) {
                    if ($categoria.options[i].value === cultivoId.cultivo.categoria.toLowerCase()) {
                        $categoria.selectedIndex = i;
                        break; 
                    }
                }
            });
        });
    }else{
        d.getElementById('seleccionar-cultivo-actualizar').textContent = 'Aún no existen cultivos :(';
    }
}

const crearCultivo = async ($btnCrearCultivo) => {
    const $msgBox = d.querySelector('.cultivos .msg');
    if($msgBox) $msgBox.remove();

    const nombre = d.getElementById('nombre-cultivo').value;
    const descripcion = d.getElementById('descripcion').value;
    let condiciones = '';
    let cuidados = '';
    const fechaSiembraInicio = d.getElementById('fecha-siembra-inicio').value;
    const fechaSiembraFin = d.getElementById('fecha-siembra-fin').value;
    
    const fechaCosechaInicio = d.getElementById('fecha-cosecha-inicio').value;
    const fechaCosechaFin = d.getElementById('fecha-cosecha-fin').value;

    const fechaSiembra = {
        'inicio': fechaSiembraInicio,
        'fin': fechaSiembraFin
    }

    const fechaCosecha = {
        'inicio': fechaCosechaInicio,
        'fin': fechaCosechaFin
    }

    const categoria = d.getElementById('categoria-nuevo-cultivo').value;

    const $condiciones = d.querySelectorAll('.condition-option');
    $condiciones.forEach(condition => {
        const conditionText = condition.value.trim();

        if(!(conditionText === '')){
            condiciones += `<li>${conditionText}</li>`;
        }
    });

    const $cuidados = d.querySelectorAll('.cuidado-option');

    $cuidados.forEach(cuidado => {
        const cuidadoText = cuidado.value.trim();

        if(!(cuidadoText === '')){
            cuidados += `<li>${cuidadoText}</li>`;
        }
    });

    Spin.newSpin('.spin-cultivos');
    const res = await cultivo.crearCultivo(nombre.toLowerCase(), descripcion, condiciones, cuidados, fechaSiembra, fechaCosecha, categoria.toLowerCase());
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
        d.getElementById('form-crear-cultivo').reset();
        loadUpdateCultivo();
    }
    
    $btnCrearCultivo.insertAdjacentElement('beforebegin', $msg);

    setTimeout(() => {
        d.querySelector('.cultivos .msg').remove();
    }, 3000);
}

const actualizarCultivo = async ($btnActualizarCultivo) => {
    const $msgBox = d.querySelector('.cultivos .msg');
    if($msgBox) $msgBox.remove();

    const id = d.getElementById('form-actualizar-cultivo').dataset.id;
    if(!id) {
        $btnActualizarCultivo.insertAdjacentElement('beforebegin', createDivMsg('error', 'Aún no has seleccionado un cultivo para actualizar'));

        setTimeout(() => {
            d.querySelector('div .msg').remove();
        }, 3000);

        return false;
    }

    const nombre = d.getElementById('nombre-cultivo-actualizado').value;
    const descripcion = d.getElementById('descripcion-actualizado').value;

    let condiciones = '';
    let cuidados = '';

    const fechaSiembraInicio = d.getElementById('fecha-siembra-inicio-actualizado').value;
    const fechaSiembraFin = d.getElementById('fecha-siembra-fin-actualizado').value;

    const fechaCosechaInicio = d.getElementById('fecha-cosecha-inicio-actualizado').value;
    const fechaCosechaFin = d.getElementById('fecha-cosecha-fin-actualizado').value;

    const fechaSiembra = {
        'inicio': fechaSiembraInicio,
        'fin': fechaSiembraFin
    }

    const fechaCosecha = {
        'inicio': fechaCosechaInicio,
        'fin': fechaCosechaFin
    }

    const categoria = d.querySelector('#form-actualizar-cultivo .categoria-cultivo').value;

    const $condiciones = d.querySelectorAll('#form-actualizar-cultivo .condition-option');
    $condiciones.forEach(condition => {
        const conditionText = condition.value.trim();

        if(!(conditionText === '')){
            condiciones += `<li>${conditionText}</li>`;
        }
    });

    const $cuidados = d.querySelectorAll('#form-actualizar-cultivo .cuidado-option');

    $cuidados.forEach(cuidado => {
        const cuidadoText = cuidado.value.trim();

        if(!(cuidadoText === '')){
            cuidados += `<li>${cuidadoText}</li>`;
        }
    });

    Spin.newSpin('#form-actualizar-cultivo .spin-cultivos');
    const res = await cultivo.actualizarCultivo(id, nombre.toLowerCase(), descripcion, condiciones, cuidados, fechaSiembra, fechaCosecha, categoria.toLowerCase());
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
        d.getElementById('form-actualizar-cultivo').reset();
        d.getElementById('form-actualizar-cultivo').removeAttribute('data-id');
        loadUpdateCultivo();
    }
    
    $btnActualizarCultivo.insertAdjacentElement('beforebegin', $msg);

    setTimeout(() => {
        d.querySelector('.cultivos .msg').remove();
    }, 3000);
}

const eliminarCultivo = async ($btnActualizarCultivo) => {
    const id = d.getElementById('form-actualizar-cultivo').dataset.id;
    if(!id) {
        $btnActualizarCultivo.insertAdjacentElement('beforebegin', createDivMsg('error', 'Aún no has seleccionado un cultivo para actualizar'));

        setTimeout(() => {
            d.querySelector('div .msg').remove();
        }, 3000);

        return false;
    }

    Spin.newSpin('#form-actualizar-cultivo .spin-cultivos');
    const res = await cultivo.eliminarCultivo(id);
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
        d.getElementById('form-actualizar-cultivo').reset();
        d.getElementById('form-actualizar-cultivo').removeAttribute('data-id');
        loadUpdateCultivo();
    }
    
    $btnActualizarCultivo.insertAdjacentElement('beforebegin', $msg);

    setTimeout(() => {
        d.querySelector('.cultivos .msg').remove();
    }, 3000);
}

export {
    actualizarCultivo,
    crearCultivo,
    eliminarCultivo,
    loadFormCultivo,
    loadUpdateCultivo
}
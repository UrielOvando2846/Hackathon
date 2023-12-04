import Cultivo from '../class/Cultivo.js';
import Estado from '../class/Estado.js';
import Spin from '../class/Spinner.js';
import { createLi, createSelectOption, createInput, createDivMsg, createDivAndCheck } from '../helpers/create-elements.js';
import { createMsg, messageNoSelected } from '../helpers/msg.js';
import { removeMsgBox } from '../helpers/remove-elements.js';

const d = document;

const cultivo = new Cultivo();
const estado = new Estado();

const loadFormCultivo = async (id) => {
    const $addCondition = d.querySelector(`#${id} .add-condition`);
    const $deleteCondition = d.querySelector(`#${id} .delete-condition`);
    
    const $addCuidado = d.querySelector(`#${id} .add-cuidado`);
    const $deleteCuidado = d.querySelector(`#${id} .delete-cuidado`);

    const $select = d.querySelector(`#${id} .categoria-cultivo`);
    $select.innerHTML = '';

    const $checksBox = d.querySelector(`#${id} .checks-cultivo`);
    $checksBox.innerHTML = '';

    d.querySelectorAll(`.new-option`).forEach(el => el.remove());
    d.querySelectorAll(`.new-option-cuidado`).forEach(el => el.remove());
    
    const $fragmentCheck = d.createDocumentFragment();
    const { estados } = await estado.obtenerEstados();

    estados.forEach(el => {
        const { code, nombre } = el;
        $fragmentCheck.appendChild(createDivAndCheck(nombre, code));
    });

    $checksBox.appendChild($fragmentCheck);
    
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
            $fragment.appendChild(createLi(el._id, el.nombre, 'data-idcultivo'));
        });

        $cultivosBox.appendChild($fragment);

        const $cultivos = d.querySelectorAll('#obtener-cultivos ul li');

        $cultivos.forEach(el => {
            el.addEventListener('click', async e => {
                const id = e.target.dataset.idcultivo;
                const $checksEstado = d.querySelectorAll('#check-estado-actualizado input');
                $checksEstado.forEach(el => el.checked = false);
                
                const { cultivo: cultivoId } = await cultivo.obtenerCultivoId(id);
                const $form = d.getElementById('form-actualizar-cultivo');
                $form.setAttribute('data-id', cultivoId._id);
                
                const $h3Title = d.getElementById('title-actualizar-cultivo');
                $h3Title.textContent = cultivoId.nombre;
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


                $nombre.value = cultivoId.nombre;
                $descripcion.value = cultivoId.descripcion;

                const extraerInfo = () => {
                    let parserCondiciones = new DOMParser();
                    let docCondiciones = parserCondiciones.parseFromString(cultivoId.condiciones_cultivo, 'text/html');
                    let liElementsCondiciones = docCondiciones.querySelectorAll('li');
                    let textArrayCondiciones = Array.from(liElementsCondiciones).map(el => el.textContent);

                    let parserCuidados = new DOMParser();
                    let docCuidados = parserCuidados.parseFromString(cultivoId.cuidados_mantenimiento, 'text/html');
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
                    const day = ((dayArr + 1) > 31 || (dayArr + 1) > 30) ? '01' : dayArr+1;

                    contenedor.value = `${year}-${ (month < 10) ? '0' + month : month }-${ ((day < 10) && (day !== '01') ) ? '0'+day : day }`;
                }

                asignarFecha($fechaSiembraInicio, cultivoId.fecha_siembra.inicio);
                asignarFecha($fechaSiembraFin, cultivoId.fecha_siembra.fin);

                asignarFecha($fechaCosechaInicio, cultivoId.fecha_cosecha.inicio);
                asignarFecha($fechaCosechaFin, cultivoId.fecha_cosecha.fin);

                for (let i = 0; i < $categoria.options.length; i++) {
                    if ($categoria.options[i].value === cultivoId.categoria.toLowerCase()) {
                        $categoria.selectedIndex = i;
                        break; 
                    }
                }

                const { estados } = cultivoId;

                $checksEstado.forEach(el => {
                    estados.forEach(estado => {
                        if(el.value === estado){
                            el.checked = true;
                        }
                    });
                });
            });
        });
    }else{
        d.getElementById('seleccionar-cultivo-actualizar').textContent = 'Aún no existen cultivos :(';
    }
}

const crearCultivo = async ($btnCrearCultivo) => {
    removeMsgBox('.cultivos');

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

    const estados = [];
    const $estados = d.querySelectorAll('#check-estado input');
    $estados.forEach(estado => {
        if(estado.checked) estados.push(estado.value);
    });

    Spin.newSpin('.spin-cultivos');
    const res = await cultivo.crearCultivo(nombre.toLowerCase(), descripcion, condiciones, cuidados, fechaSiembra, fechaCosecha, categoria.toLowerCase(), estados);
    Spin.destroySpin();

    createMsg($btnCrearCultivo, res, '.cultivos', () => {
        d.getElementById('form-crear-cultivo').reset();
        loadUpdateCultivo();
    });
}

const actualizarCultivo = async ($btnActualizarCultivo) => {
    removeMsgBox('.cultivos');

    const id = d.getElementById('form-actualizar-cultivo').dataset.id;
    if(!messageNoSelected(id, $btnActualizarCultivo, 'Aún no has seleccionado un cultivo para actualizar')) return;

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

    const estados = [];
    const $estados = d.querySelectorAll('#check-estado-actualizado input');
    $estados.forEach(estado => {
        if(estado.checked) estados.push(estado.value);
    });

    Spin.newSpin('#form-actualizar-cultivo .spin-cultivos');
    const res = await cultivo.actualizarCultivo(id, nombre.toLowerCase(), descripcion, condiciones, cuidados, fechaSiembra, fechaCosecha, categoria.toLowerCase(), estados);
    Spin.destroySpin();

    createMsg($btnActualizarCultivo, res, '.cultivos', () => {
        d.getElementById('form-actualizar-cultivo').reset();
        d.getElementById('form-actualizar-cultivo').removeAttribute('data-id');
        loadUpdateCultivo();
    });
}

const eliminarCultivo = async ($btnActualizarCultivo) => {
    const id = d.getElementById('form-actualizar-cultivo').dataset.id;
    if(!messageNoSelected(id, $btnActualizarCultivo, 'Aún no has seleccionado un cultivo para eliminar')) return;

    Spin.newSpin('#form-actualizar-cultivo .spin-cultivos');
    const res = await cultivo.eliminarCultivo(id);
    Spin.destroySpin();

    createMsg($btnActualizarCultivo, res, '.cultivos', () => {
        d.getElementById('form-actualizar-cultivo').reset();
        d.getElementById('form-actualizar-cultivo').removeAttribute('data-id');
        loadUpdateCultivo();
    });
}

export {
    actualizarCultivo,
    crearCultivo,
    eliminarCultivo,
    loadFormCultivo,
    loadUpdateCultivo
}
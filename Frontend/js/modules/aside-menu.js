import Cultivo from '../class/Cultivo.js';
import Categoria from '../class/Categoria.js';
import { createLiMenu, createStructureInfoCultivo } from '../helpers/create-elements.js';
import Spinner from '../class/Spinner.js';
import { coloringDates } from './calendar.js';
import { codes, drawMapInfo } from './mapa.js';

const d = document;

const cultivo = new Cultivo();
const categoria = new Categoria();

const loadMenu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            Spinner.newSpin('.spin-aside');
            const { total: totalCategorias, categorias } = await categoria.obtenerCategorias();
            
            if(totalCategorias > 0){
                const { total: totalCutlivos, cultivos } = await cultivo.obtenerCultivos();
                if(totalCutlivos > 0){
                    const $container = d.querySelector('#menu ul');
                    let cultivosNombres = [];
                    const $fragment = d.createDocumentFragment();
                    categorias.forEach(cat => {
                        cultivos.forEach(cul => {
                            if(cat.nombre === cul.categoria){
                                cultivosNombres.push({nombre: cul.nombre, id: cul._id});
                            }
                        });
    
                        if(cultivosNombres.length !== 0){
                            const $categoryMenu = createLiMenu(['fa-solid', 'fa-plant-wilt'], cat.nombre, cultivosNombres);
                            $fragment.appendChild($categoryMenu);
                            cultivosNombres = [];
                        }
                    });
    
                    $container.appendChild($fragment);
    
                    const $listContainer = d.querySelectorAll('.list-menu');
    
                    $listContainer.forEach(el => {
                        el.addEventListener('click', () => {
                            el.classList.toggle('arrow');
    
                            let height = 0;
                            let $menu = el.nextElementSibling;
    
                            if($menu.clientHeight === 0){
                                height = $menu.scrollHeight;
                            }
    
                            $menu.style.height = height+'px';
                        })
                    });
                }
            }
            Spinner.destroySpin();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

const drawCalendarColors = async (cultivoId, id) => {

    if(id){
        const {cultivo: cultivoId} = await cultivo.obtenerCultivoId(id);
        const { fecha_siembra, fecha_cosecha } = cultivoId;

        const fechaSiembraInicio = new Date(fecha_siembra.inicio);
        const fechaSiembraFin = new Date(fecha_siembra.fin);

        const fechaCosechaInicio = new Date(fecha_cosecha.inicio);
        const fechaCosechaFin = new Date(fecha_cosecha.fin);

        coloringDates(fechaSiembraInicio, fechaSiembraFin, 'siembra', cultivoId.nombre, cultivoId._id);
        coloringDates(fechaCosechaInicio, fechaCosechaFin, 'cosecha', cultivoId.nombre, cultivoId._id);

        return;
    }
    
    const { fecha_siembra, fecha_cosecha } = cultivoId;

    const fechaSiembraInicio = new Date(fecha_siembra.inicio);
    const fechaSiembraFin = new Date(fecha_siembra.fin);

    const fechaCosechaInicio = new Date(fecha_cosecha.inicio);
    const fechaCosechaFin = new Date(fecha_cosecha.fin);

    coloringDates(fechaSiembraInicio, fechaSiembraFin, 'siembra', cultivoId.nombre, cultivoId._id);
    coloringDates(fechaCosechaInicio, fechaCosechaFin, 'cosecha', cultivoId.nombre, cultivoId._id);
}

const drawCalendarInterface = async (id) => {
    const {cultivo: cultivoId} = await cultivo.obtenerCultivoId(id);
    drawCalendarColors(cultivoId);
    
    const { nombre, categoria, descripcion, condiciones_cultivo, cuidados_mantenimiento } = cultivoId;

    const $info = d.getElementById('info');
    $info.innerHTML = '';

    $info.appendChild(createStructureInfoCultivo(nombre, categoria, descripcion, condiciones_cultivo, cuidados_mantenimiento));
}

const drawMapInterface = async (id) => {
    const { cultivo: cultivoId } = await cultivo.obtenerCultivoId(id);
    drawMapInfo(cultivoId);
    
    const { nombre, categoria, descripcion, condiciones_cultivo, cuidados_mantenimiento, estados } = cultivoId;

    const estadosName = [];

    estados.forEach(estado => {
        if(codes[estado]) estadosName.push(codes[estado]);
    });

    const $info = d.getElementById('info');
    $info.innerHTML = '';

    $info.appendChild(createStructureInfoCultivo(nombre, categoria, descripcion, condiciones_cultivo, cuidados_mantenimiento, estadosName));
}

const itemMenuEvent = () => {
    const $itemsMenu = d.querySelectorAll('.item');

    $itemsMenu.forEach(el => {
        el.addEventListener('click', e => {
            if(localStorage.getItem('menu') === 'calendar') drawCalendarInterface(e.target.dataset.id);
            if(localStorage.getItem('menu') === 'mapa') drawMapInterface(e.target.dataset.id);
        });
    });
}

export {
    loadMenu,
    drawCalendarColors,
    itemMenuEvent
}
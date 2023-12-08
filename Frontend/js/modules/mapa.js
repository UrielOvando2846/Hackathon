import Cultivo from '../class/Cultivo.js';
import Spin from '../class/Spinner.js';
import { createStructureInfoCultivo } from '../helpers/create-elements.js';

const d = document;
const cultivo = new Cultivo();

const codes = {
  "MEX2706": "Baja California", 
  "MEX2707": "Baja California Sur", 
  "MEX2708": "Coahuila", 
  "MEX2709": "Chihuahua", 
  "MEX2710": "Durango", 
  "MEX2711": "Sinaloa", 
  "MEX2712": "Sonora", 
  "MEX2713": "Zacatecas", 
  "MEX2714": "Nuevo León", 
  "MEX2715": "San Luis Potosí", 
  "MEX2716": "Tamaulipas", 
  "MEX2717": "Aguascalientes", 
  "MEX2718": "Colima", 
  "MEX2719": "Jalisco", 
  "MEX2720": "Michoacán", 
  "MEX2721": "Nayarit", 
  "MEX2722": "Campeche", 
  "MEX2723": "Oaxaca", 
  "MEX2724": "Puebla", 
  "MEX2725": "Tabasco", 
  "MEX2726": "Tlaxcala", 
  "MEX2727": "Distrito Federal", 
  "MEX2728": "Guanajuato", 
  "MEX2729": "Guerrero", 
  "MEX2730": "Hidalgo", 
  "MEX2731": "México", 
  "MEX2732": "Morelos", 
  "MEX2733": "Querétaro", 
  "MEX2734": "Veracruz", 
  "MEX2735": "Chiapas", 
  "MEX2736": "Quintana Roo", 
  "MEX2737": "Yucatán"
}

const keyCodes = Object.keys(codes);

const deleteAttributes = ['baseProfile', 'fill', 'height', 'stroke', 'stroke-linecap', 'stroke-linejoin', 'stroke-width', 'width'];

const fetchSVG = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo SVG');
            }
    
            const svgCode = await response.text();
            resolve(svgCode);
        } catch (error) {
            reject('Error al cargar el archivo SVG:', error);
        }
    });
}

const createMenuItem = (id, name) => {
    const $liElement = d.createElement('li');
    $liElement.classList.add('list-container', 'estado-menu');
    $liElement.setAttribute('data-id', id);
    
    const $divElement = d.createElement('div');
    $divElement.classList.add('align-li', 'item', 'country-option');
    $divElement.setAttribute('data-id', id);
    
    const $iconCountry = d.createElement('i');
    $iconCountry.classList.add('fa-solid', 'fa-earth-americas');
    $iconCountry.setAttribute('data-id', id);
    
    const $groupName = d.createElement('p');
    $groupName.classList.add('name-group');
    $groupName.textContent = name;
    $groupName.setAttribute('data-id', id);

    // Adjuntar elementos
    $liElement.appendChild($divElement);
    $divElement.appendChild($iconCountry);
    $divElement.appendChild($groupName);

    // Agregar la estructura creada al elemento deseado en el HTML
    return $liElement;
}

const drawStructure = () => {
    return new Promise( async (resolve, reject) => {
        const $divMainMap = d.createElement('div');
    
        const $h1 = d.createElement('h1');
        $h1.classList.add('h1-mapa');
        $h1.textContent = 'Mapa del territorio mexicano';

        const $h2 = d.createElement('h2');
        $h2.classList.add('h2-mapa');

        const $hr = d.createElement('hr');
        $hr.style.width = '90%';
        $hr.style.marginLeft = 'auto';
        $hr.style.marginRight = 'auto';
    
        const $mapaContainer = d.createElement('div');
        $mapaContainer.id = 'mapa';
        $mapaContainer.classList.add('mapa');
    
        const svgUrl = '../assets/img/mx.svg';
        try {
            const svgCode = await fetchSVG(svgUrl);
    
            $mapaContainer.innerHTML = svgCode;
    
            const $svg = $mapaContainer.querySelector('svg');
            $svg.id = 'mapa-mexico';
            $svg.classList.add('mapa-mexico');
            
            deleteAttributes.forEach(att => {
              $svg.removeAttribute(att);
            });
        
            $divMainMap.appendChild($h1);
            $divMainMap.appendChild($h2);
            $divMainMap.appendChild($hr);
            $divMainMap.appendChild($mapaContainer);

            resolve($divMainMap);
        } catch (error) {
            reject(error);
        }
    });
}

const drawMap = async () => {
    const $calendar = d.getElementById('app-calendar');
    if($calendar) $calendar.remove();

    const $app = d.getElementById('app');
    $app.innerHTML = '';

    const $spiner = d.createElement('div');
    $spiner.classList.add('spin', 'spinner-map');

    $app.appendChild($spiner);

    Spin.newSpin('.spinner-map');
    $app.appendChild(await drawStructure());
    Spin.destroySpin();

    const $menu = d.getElementById('menu');
    const $div = d.createElement('div');
    $div.id = 'mapa-options';
    
    const $h3 = d.createElement('h3');
    $h3.textContent = 'Selecciona un estado';

    const $ul = d.createElement('ul');

    keyCodes.forEach(el => {
        const $option = createMenuItem(el, codes[el]);
    
        $ul.appendChild($option);
    });

    $div.appendChild($h3);
    $div.appendChild($ul);

    $menu.appendChild($div);

    const $info = d.createElement('div');
    $info.id = 'info';

    const $estados = d.querySelectorAll('.estado-menu');

    $estados.forEach(el => {
        el.addEventListener('mouseover', () => {
            const idEstado = el.dataset.id;
            const $estadoMapa = d.getElementById(idEstado);
    
            $estadoMapa.style.fill = '#166c38';
        });
    
        el.addEventListener('mouseout', () => {
            const idEstado = el.dataset.id;
            const $estadoMapa = d.getElementById(idEstado);
            
            if(!($estadoMapa.classList.contains('selected'))) $estadoMapa.style.fill = '';
        });

        el.addEventListener('click', async (e) => {
            const estado = e.target.dataset.id;

            d.querySelectorAll('path').forEach(el => {
                if(el.classList.contains('selected')){
                    el.classList.remove('selected');
                    el.style.fill = '';
                }
            });

            const $pathElement = d.getElementById(estado);
            $pathElement.classList.add('selected');
            $pathElement.style.fill = '#166c38';

            const { cultivos } = await cultivo.obtenerCultivos();

            const $h2 = d.querySelector('.h2-mapa');
            $h2.textContent = '';
            $h2.textContent = codes[estado];

            const cultivosArr = [];
            cultivos.forEach(cul => {
                cul.estados.forEach(cules => {
                    if(cules === estado) cultivosArr.push(cul);
                });
            });

            if(cultivosArr.length === 0){
                $info.innerHTML = `
                    <h2 style="text-align: center;">Aún no existen cultivos en este estado</h2>
                `;
            }else{
                $info.innerHTML = '';
                const $fragment = d.createDocumentFragment();
                cultivosArr.forEach(el => {
                    const { nombre, categoria, descripcion, condiciones_cultivo, cuidados_mantenimiento } = el;
                    $fragment.appendChild(createStructureInfoCultivo(nombre, categoria, descripcion, condiciones_cultivo, cuidados_mantenimiento));
                });

                $info.appendChild($fragment);
            }
        });
    });

    $app.appendChild($info);
}

const drawMapInfo = (cultivoId) => {
    const { nombre, estados } = cultivoId;

    const $h2 = d.querySelector('.h2-mapa');
    $h2.textContent = '';

    $h2.textContent = nombre;

    const $path = d.querySelectorAll('.mapa-mexico path');
    $path.forEach(p => p.style.fill = '');

    estados.forEach(el => {
        const $estadoSelect = d.getElementById(el);
        $estadoSelect.style.fill = '#166c38';
        $estadoSelect.classList.add('selected');
    });
}

export {
    drawMap,
    drawMapInfo,
    codes
}
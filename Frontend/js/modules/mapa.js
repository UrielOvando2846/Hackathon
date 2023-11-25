const d = document;

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

const fetchSVG = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo SVG');
        }

        const svgCode = await response.text();
        return svgCode;
    } catch (error) {
        console.error('Error al cargar el archivo SVG:', error);
        throw error;
    }
}

const createMenuItem = (id, name) => {
    const $liElement = d.createElement('li');
    $liElement.classList.add('list-container', 'estado-menu');
    $liElement.setAttribute('data-id', id);
    
    const $divElement = d.createElement('div');
    $divElement.classList.add('align-li', 'item', 'country-option');

    const $iconCountry = d.createElement('i');
    $iconCountry.classList.add('fa-solid', 'fa-earth-americas');

    const $groupName = d.createElement('p');
    $groupName.classList.add('name-group');
    $groupName.textContent = name;

    // Adjuntar elementos
    $liElement.appendChild($divElement);
    $divElement.appendChild($iconCountry);
    $divElement.appendChild($groupName);

    // Agregar la estructura creada al elemento deseado en el HTML
    return $liElement;
}

const drawMap = async () => {
    const $app = d.getElementById('app');
    $app.innerHTML = '';

    const $h1 = d.createElement('h1');
    $h1.classList.add('h1-mapa');
    $h1.textContent = 'Mapa del territorio mexicano';

    $app.appendChild($h1);

    const $mapaContainer = d.createElement('div');
    $mapaContainer.id = 'mapa';
    $mapaContainer.classList.add('mapa');

    const svgUrl = './assets/img/mx.svg';
    try {
        const svgCode = await fetchSVG(svgUrl);

        $mapaContainer.innerHTML = svgCode;

        const $svg = $mapaContainer.querySelector('svg');
        $svg.id = 'mapa-mexico';
        $svg.classList.add('mapa-mexico');
        
        deleteAttributes.forEach(att => {
          $svg.removeAttribute(att);
        });
        
        $app.appendChild($mapaContainer);
    } catch (error) {
        console.log(error);
    }

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

    const $estados = d.querySelectorAll('.estado-menu');

    $estados.forEach(el => {
      el.addEventListener('mouseover', () => {
          const idEstado = el.dataset.id;
          const $estadoMapa = d.getElementById(idEstado);
  
          $estadoMapa.style.fill = '#166c38';
      });
  
      el.addEventListener('mouseout', () => {
          const idEstado = el.dataset.id;
          const $estadoMapa = document.getElementById(idEstado);
        
          $estadoMapa.style.fill = '';
      });
  });
}

export {
    drawMap
}
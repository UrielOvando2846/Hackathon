import { drawCalendar, coloringDates } from "./modules/calendar.js";
import { drawMap } from "./modules/mapa.js";

const d = document

d.addEventListener('DOMContentLoaded', () => {
    const $btnCalendarioMenu = d.getElementById('calendario-menu');
    const $btnMapaMenu = d.getElementById('mapa-menu');

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

    if(!localStorage.getItem('menu')) localStorage.setItem('menu', 'calendar');

    d.addEventListener('click', e => {
        if(e.target === $btnCalendarioMenu) {
            localStorage.setItem('menu', 'calendar');

            $btnCalendarioMenu.classList.add('selected');
            $btnMapaMenu.classList.remove('selected');

            drawCalendar();
        }
        if(e.target === $btnMapaMenu) {
            localStorage.setItem('menu', 'mapa');
            
            $btnMapaMenu.classList.add('selected');
            $btnCalendarioMenu.classList.remove('selected');

            drawMap();
        }
    });

    if(localStorage.getItem('menu') === 'calendar'){
        $btnCalendarioMenu.classList.add('selected');
        drawCalendar();
    }else if(localStorage.getItem('menu') === 'mapa'){
        $btnMapaMenu.classList.add('selected');
        drawMap();
    }

    const $itemsMenu = d.querySelectorAll('.item');

    $itemsMenu.forEach(el => {
        el.addEventListener('click', e => {
            coloringDates(new Date(2023, 3, 25), new Date(2023, 8, 15), 'siembra');
            coloringDates(new Date(2023, 11, 25), new Date(2023, 11, 30), 'cosecha');
        });
    });
});
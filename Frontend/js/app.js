import { itemMenuEvent, loadMenu } from "./modules/aside-menu.js";
import { drawCalendar } from "./modules/calendar.js";
import { addLoader } from "./modules/loader.js";
import { drawMap } from "./modules/mapa.js";

addLoader();

const d = document;

d.addEventListener('DOMContentLoaded', async () => {
    await loadMenu();

    const $btnCalendarioMenu = d.getElementById('calendario-menu');
    const $btnMapaMenu = d.getElementById('mapa-menu');

    if(!localStorage.getItem('menu')) localStorage.setItem('menu', 'calendar');

    d.addEventListener('click', async e => {
        if(e.target === $btnCalendarioMenu) {
            localStorage.setItem('menu', 'calendar');

            $btnCalendarioMenu.classList.add('selected');
            $btnMapaMenu.classList.remove('selected');

            drawCalendar();
            itemMenuEvent();
        }
        if(e.target === $btnMapaMenu) {
            localStorage.setItem('menu', 'mapa');
            
            $btnMapaMenu.classList.add('selected');
            $btnCalendarioMenu.classList.remove('selected');

            drawMap();
            itemMenuEvent();
        }
    });

    if(localStorage.getItem('menu') === 'calendar'){
        $btnCalendarioMenu.classList.add('selected');
        drawCalendar();
    }else if(localStorage.getItem('menu') === 'mapa'){
        $btnMapaMenu.classList.add('selected');
        drawMap();
    }

    itemMenuEvent();
});
import Calendar from "../class/Calendar.js";

const d = document;
const calendar = new Calendar();

const createCalendar = (month, year) => {
    // Crear elementos y asignar clases e IDs
    const $calendar = d.createElement('div');
    $calendar.classList.add('calendar');

    const $info = d.createElement('div');
    $info.classList.add('info');

    const $month = d.createElement('h3');
    $month.classList.add('month');
    $month.id = 'month';
    $month.textContent = month;

    const $year = d.createElement('p');
    $year.classList.add('year');
    $year.id = 'year';
    $year.textContent = year;

    const $weaks = d.createElement('div');
    $weaks.classList.add('weaks');

    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    daysOfWeek.forEach(day => {
        const $dayName = d.createElement('div');
        $dayName.classList.add('day_name_calendar', 'item_calendar');
        $dayName.textContent = day;
        $weaks.appendChild($dayName);
    });

    const $daysCalendar = d.createElement('div');
    $daysCalendar.classList.add('days_calendar');
    $daysCalendar.id = 'days';

    // Anidar los elementos creados
    $info.appendChild($month);
    $info.appendChild($year);

    $calendar.appendChild($info);
    $calendar.appendChild($weaks);
    $calendar.appendChild($daysCalendar);

    return $calendar;
}

const drawMonths = () => {
    const $fragment = d.createDocumentFragment();

    for(let i = 0; i < 12; i++){
        const $calendar = createCalendar(calendar.months[i], calendar.currentYear);
        const $container = $calendar.querySelector('#days');
        calendar.writeMonth(i, $container);

        $fragment.appendChild($calendar);
    }

    return $fragment;
}

const drawStructure = () => {
    const $container = d.getElementById('app');
    $container.innerHTML = '';

    // Crear elementos HTML
    const $titleCalendarDiv = d.createElement('div');
    $titleCalendarDiv.classList.add('title-calendar');

    const $chevronLeftIcon = d.createElement('i');
    $chevronLeftIcon.classList.add('fa-solid', 'fa-chevron-left', 'disabled');
    $chevronLeftIcon.id = 'last';

    const $calendarTitle = d.createElement('h1');
    $calendarTitle.textContent = 'Calendario De Cosecha Urbano';

    const $chevronRightIcon = d.createElement('i');
    $chevronRightIcon.classList.add('fa-solid', 'fa-chevron-right');
    $chevronRightIcon.id = 'next';

    // Agregar elementos al contenedor '.title-calendar'
    $titleCalendarDiv.appendChild($chevronLeftIcon);
    $titleCalendarDiv.appendChild($calendarTitle);
    $titleCalendarDiv.appendChild($chevronRightIcon);

    const $div = d.createElement('div');
    $div.classList.add('calendar-box');
    $div.id = 'calendar-box';

    // Agregar la estructura creada al contenedor en el DOM
    $container.appendChild($titleCalendarDiv);
    $container.appendChild($div);
}


const drawCalendar = () => {
    const $menuMapa = d.getElementById('mapa-options');
    if($menuMapa) $menuMapa.remove();

    drawStructure();

    const $calendarBox = d.getElementById('calendar-box');
    const $nextYearBtn = d.getElementById('next');
    const $lastYearBtn = d.getElementById('last');

    $calendarBox.appendChild(drawMonths());
    
    const $months = $calendarBox.querySelectorAll('.calendar');
    const $days = $months[calendar.monthNumber].querySelectorAll('.day_calendar');
    
    let daysLastMonth = 0;
    $days.forEach(el => {
        if(el.classList.contains('last_days')) daysLastMonth++;
    });
    
    $days[(calendar.currentDay+daysLastMonth)-1].classList.add('today');
    
    d.addEventListener('click', e => {
        const date = new Date();
        const year = date.getFullYear();
    
        if(e.target === $nextYearBtn){
            if(calendar.currentYear === year){
                const newYear = calendar.nextYear();
                if(newYear){
                    $calendarBox.innerHTML = '';
                    $calendarBox.appendChild(drawMonths());
                    
                    $nextYearBtn.classList.add('disabled');
                    $lastYearBtn.classList.remove('disabled');
                }
            }
        }
    
        if(e.target === $lastYearBtn){
            if(!(calendar.currentYear === year)){
                const lastYear = calendar.lastYear();
                if(lastYear){
                    $calendarBox.innerHTML = '';
                    $calendarBox.appendChild(drawMonths());
    
                    $lastYearBtn.classList.add('disabled');
                    $nextYearBtn.classList.remove('disabled');
                }
            }
        }
    });
}

const coloringDates = (startDate, endDate, className) => {
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth();
    
    const dayEnd = endDate.getDate();
    const monthEnd = endDate.getMonth();

    const $calendar = d.querySelectorAll('.calendar');

    $calendar.forEach((el, i) => {
        if(i === monthStart){
            const $dayItem = el.querySelectorAll('.day');
            $dayItem.forEach((elDay, j) => {
                if((j+2) > dayStart){
                    elDay.classList.add(className);
                }
            });
        }

        if(i > monthStart && i < monthEnd){
            const $dayItem = el.querySelectorAll('.day');
            $dayItem.forEach(elDay => {
                elDay.classList.add(className);
            });
        }

        if(i === monthEnd){
            const $dayItem = el.querySelectorAll('.day');
            $dayItem.forEach((elDay, j) => {
                if((j+1) <= dayEnd){
                    elDay.classList.add(className);
                }
            });
        }
    });
}

export {
    drawCalendar,
    coloringDates
}
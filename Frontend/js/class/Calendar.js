export default class Calendar{
    constructor(){
        this.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.currentDate = new Date();
        this.currentDay = this.currentDate.getDate();
        this.monthNumber = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.yearNow = this.currentDate.getFullYear();
    }

    writeMonth(month, container){
        const $fragment = document.createDocumentFragment();

        for(let i = this.startDay(month); i > 0; i--){
            const $div = document.createElement('div');

            $div.classList.add('day_calendar');
            $div.classList.add('item_calendar');
            $div.classList.add('last_days');
            
            $div.textContent = this.getTotalDays(this.monthNumber-1)-(i-1);
            
            $fragment.appendChild($div);
        }
        
        for(let i = 1; i <= this.getTotalDays(month); i++){
            const $div = document.createElement('div');
            
            $div.classList.add('day');
            $div.classList.add('day_calendar');
            $div.classList.add('item_calendar');

            $div.textContent = i;

            $fragment.appendChild($div);
        }

        container.appendChild($fragment);
    }

    getTotalDays(month){
        if(month === -1) month = 11;

        if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
            return  31;
        } else if (month === 3 || month === 5 || month === 8 || month === 10) {
            return 30;
        } else {
            return this.isLeap() ? 29:28;
        }
    }

    isLeap(){
        return ((this.currentYear%100 !== 0) && (this.currentYear%4 === 0) || (this.currentYear%400 === 0));
    }

    startDay(month){
        let start = new Date(this.currentYear, month, 1);
        return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
    }

    nextYear(){
        if(this.currentYear === this.yearNow){
            this.currentYear++;
            this.setNewYear();
            return true;
        }else{
            return false;
        }
    }

    lastYear(){
        if(this.yearNow+1 === this.currentYear){
            this.currentYear--;
            this.setNewYear();
            return true;
        }else{
            return false;
        }
    }

    setNewYear(){
        this.currentDate.setFullYear(this.currentYear, this.monthNumber, this.currentDay);
    }
}
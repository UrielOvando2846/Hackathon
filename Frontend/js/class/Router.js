const home = '192.168.100.139';
const work = '192.168.11.212';
const domainApi = '127.0.0.1';

export class Router{
    static getRuteApi(url){
        return `http://${work}:8080/api${url}`;
    }

    static getRuteApp(url){
        return `http://${domainApi}:5500/Frontend${url}`;
    }
}
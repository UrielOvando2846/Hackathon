const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.cultivosPath = '/api/cultivos';
        this.categoriasPath = '/api/categorias';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
    }

    async conectarDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.cultivosPath, require('../routes/cultivo'));
        this.app.use(this.categoriasPath, require('../routes/categoria'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Corriendo en puerto:'+this.port);
        });
    }
}

module.exports = Server;
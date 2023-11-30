const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosPost = async (req, res=response) => {
    const { nombre, correo, password } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol: 'USER_ROLE'});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la base de datos
    await usuario.save();
    delete usuario.password;
    
    res.status(201).json({
        msg: "Usuario Creado Correctamente"
    });
}


module.exports = {
    usuariosPost
}
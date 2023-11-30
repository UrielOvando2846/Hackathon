const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generarJWT');

const loginController = async (req, res=response) => {

    const { correo, password } = req.body;

    try {
        
        // Verificar si email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - correo'
            });
        }

        // Si usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - estado:false'
            });
        }

        // Si contraseña es correcta
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if(!validPass){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - password'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'ok',
            token
        });
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            msg: 'Algo salió mal'
        });
    }
}

module.exports = {
    loginController
}
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosPost } = require('../controllers');
const {  correoExiste } = require('../helpers');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
    check('nombre', 'El nombrees obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser de más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( correoExiste ),
    validarCampos
], usuariosPost);


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');

const { loginController } = require('../controllers');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginController);

module.exports = router;
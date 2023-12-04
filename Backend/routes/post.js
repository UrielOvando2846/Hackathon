const { Router } = require('express');
const { check } = require('express-validator');

const { crearPost, obtenerPosts, actualizarPost, eliminarPost, obtenerPostId } = require('../controllers');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { existePost, existePostId } = require('../helpers');

const router = Router();

router.get('/', obtenerPosts);

router.get('/:id', [
    check('id', 'id inválido').isMongoId(),
    check('id').custom( existePostId ),
    validarCampos
], obtenerPostId);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('titulo').custom( existePost ),
    check('info', 'La información del post es necesaria').not().isEmpty(),
    validarCampos
], crearPost);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existePostId ),
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('info', 'La información del post es necesaria').not().isEmpty(),
    validarCampos
], actualizarPost);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existePostId ),
    validarCampos
], eliminarPost);

module.exports = router;
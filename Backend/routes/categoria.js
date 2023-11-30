const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, obtenerCategoriaId, actualizarCategoria, eliminarCategoria } = require('../controllers');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { categoriaNoExiste, existeCategoriaId } = require('../helpers');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'id inválido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], obtenerCategoriaId);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom( categoriaNoExiste ),
    validarCampos
], crearCategoria);

router.put('/update/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'Id inválido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

router.delete('/delete/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'Id inválido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], eliminarCategoria)

module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');

const { crearCultivo, accessPanel, obtenerCultivos, actualizarCultivo, obtenerCultivoId, eliminarCultivo } = require('../controllers');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { esFechaValida, categoriaExiste, existeCultivo, existeCultivoId, existenEstados } = require('../helpers');

const router = Router();

router.get('/access', [
    validarJWT,
    validarCampos
], accessPanel);

router.get('/', obtenerCultivos);

router.get('/:id', [
    check('id', 'id inválido').isMongoId(),
    check('id').custom( existeCultivoId ),
    validarCampos
], obtenerCultivoId);

router.post('/create', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom( existeCultivo ),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('condiciones_cultivo', 'Es necesario indicar las condiciones de cuidado para el cultivo').not().isEmpty(),
    check('cuidados_mantenimiento', 'Es necesario indicar los cuidados y el mantenimiento del cultivo').not().isEmpty(),
    check('fecha_siembra', 'Las fechas de siembra son obligatorias').not().isEmpty(),
    check('fecha_cosecha', 'Las fechas de cosecha son obligatorias').not().isEmpty(),
    check('fecha_siembra').custom( esFechaValida ),
    check('fecha_cosecha').custom( esFechaValida ),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    check('categoria').custom( categoriaExiste ),
    check('estados', 'Es necesario enviar al menus un estado').not().isEmpty(),
    check('estados', 'El contenido enviado no es un array').isArray(),
    check('estados').custom( existenEstados ),
    validarCampos
], crearCultivo);

router.put('/update/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('condiciones_cultivo', 'Es necesario indicar las condiciones de cuidado para el cultivo').not().isEmpty(),
    check('cuidados_mantenimiento', 'Es necesario indicar los cuidados y el mantenimiento del cultivo').not().isEmpty(),
    check('fecha_siembra', 'Las fechas de siembra son obligatorias').not().isEmpty(),
    check('fecha_cosecha', 'Las fechas de cosecha son obligatorias').not().isEmpty(),
    check('fecha_siembra').custom( esFechaValida ),
    check('fecha_cosecha').custom( esFechaValida ),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    check('categoria').custom( categoriaExiste ),
    validarCampos
], actualizarCultivo);

router.delete('/delete/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeCultivoId ),
    validarCampos
], eliminarCultivo);

module.exports = router;
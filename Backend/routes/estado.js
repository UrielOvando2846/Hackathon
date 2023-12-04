const { Router } = require('express');
const { obtenerEstados } = require('../controllers');

const router = Router();

router.get('/', obtenerEstados);

module.exports = router;
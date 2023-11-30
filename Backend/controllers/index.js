const auth = require('./auth');
const categorias = require('./categorias');
const cultivos = require('./cultivos');
const usuarios = require('./usuarios');

module.exports = {
    ...auth,
    ...categorias,
    ...cultivos,
    ...usuarios
}
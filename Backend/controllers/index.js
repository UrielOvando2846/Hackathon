const auth = require('./auth');
const categorias = require('./categorias');
const cultivos = require('./cultivos');
const usuarios = require('./usuarios');
const estados = require('./estados');
const posts = require('./posts');

module.exports = {
    ...auth,
    ...categorias,
    ...cultivos,
    ...usuarios,
    ...estados,
    ...posts
}
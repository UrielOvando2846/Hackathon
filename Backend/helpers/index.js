const dbValidators = require('./dbValidators');
const fechaValida = require('./fechaValida');
const generarJWT = require('./generarJWT');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...fechaValida
}
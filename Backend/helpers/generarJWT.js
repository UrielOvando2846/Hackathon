const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '730h'
        }, (err, token) => {
            if(err){
                reject('No se pudo generar el token');
                console.log(err);
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}
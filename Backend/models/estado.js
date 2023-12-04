const {Schema, model} = require('mongoose');

const estadoSchema = Schema({
    code:{
        type: String,
        required: [true, 'El código del estados es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    }
});

estadoSchema.methods.toJSON = function(){
    const { __v, ...estado } = this.toObject();
    return estado;
}

module.exports = model('Estado', estadoSchema);
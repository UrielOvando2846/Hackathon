const {Schema, model} = require('mongoose');

const cultivoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    
    condiciones_cultivo: {
        type: String,
        required: [true, 'Es necesario indicar las condiciones de cuidado para el cultivo']
    },
    cuidados_mantenimiento: {
        type: String,
        required: [true, 'Es necesario indicar los cuidados y el mantenimiento del cultivo']
    },
    fecha_siembra: {
        inicio: {
            type: Date,
            required: [true, 'La fecha de inicio de siembra es obligatoria']
        },
        fin: {
            type: Date,
            required: [true, 'La fecha de fin de siembra es obligatoria']
        }
    },
    fecha_cosecha: {
        inicio: {
            type: Date,
            required: [true, 'La fecha de inicio de cosecha es obligatoria']
        },
        fin: {
            type: Date,
            required: [true, 'La fecha de fin de cosecha es obligatoria']
        }
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        ref: 'Categoria'
    },
    estados: {
        type: Array,
        required: [true, "Es necesario al menos un estado"],
        ref: 'Estado'
    },
    estado: {type: Boolean, default: true}
});

cultivoSchema.methods.toJSON = function(){
    const { __v, estado, ...cultivo } = this.toObject();
    return cultivo;
}

module.exports = model('Cultivo', cultivoSchema);
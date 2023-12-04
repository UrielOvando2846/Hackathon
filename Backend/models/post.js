const {Schema, model} = require('mongoose');

const postSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    info: {
        type: String,
        required: [true, 'La información del post es necesaria']
    },
    estado: { type: Boolean, default: true }
});

postSchema.methods.toJSON = function(){
    const { __v, estado, ...post } = this.toObject();
    return post;
}

module.exports = model('Post', postSchema);
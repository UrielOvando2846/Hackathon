const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Cultivo = require('../models/cultivo');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const correoExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioByID = async id => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCultivo = async nombre => {
    const existeCultivo = await Cultivo.findOne({nombre, estado: true});

    if(existeCultivo){
        throw new Error(`El cultivo ${nombre} ya existe`);
    }
}

const existeCultivoId = async id => {
    const existeCultivo = await Cultivo.findOne({_id: id, estado: true});

    if(!existeCultivo){
        throw new Error(`El cultivo no existe`);
    }
}

const categoriaNoExiste = async nombre => {

    const existeCategoria = await Categoria.findOne({nombre});

    if(existeCategoria){
        throw new Error(`La categoría ${nombre} ya existe`);
    }
}

const existeCategoriaId = async id => {
    const existeCategoria = await Categoria.findOne({ _id: id, estado: true });

    if(!existeCategoria){
        throw new Error(`La categoría no existe`);
    }
}

module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioByID,
    categoriaNoExiste,
    existeCultivo,
    existeCultivoId,
    existeCategoriaId
}
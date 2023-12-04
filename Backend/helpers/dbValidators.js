const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Cultivo = require('../models/cultivo');
const Estado = require('../models/estado');
const Post = require('../models/post');

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

const categoriaExiste = async nombre => {
    const existeCategoria = await Categoria.findOne({nombre, estado: true});

    if(!existeCategoria){
        throw new Error(`La categoría ${nombre} no existe`);
    }
}

const existeCategoriaPorNombre = async nombre => {
    const existeCategoria = await Categoria.findOne({nombre, estado: true});

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

const existenEstados = async estados => {
    if(estados.length === 0){
        throw new Error('Debes seleccionar al menos un estado');
    }

    const estadosPromise = new Promise((resolve, reject) => {
        estados.forEach(async (estado, i) => {
            const query = { code: estado };
            const res = await Estado.findOne(query);
    
            if(!res){
                reject(estado);
            }
    
            if(i === estados.length-1){
                resolve(estado);
            }
        });
    });

    
    let errorArr = false;

    try {
        await estadosPromise;
    } catch (error) {
        errorArr = error;
    }

    if(errorArr){
        throw new Error(`No existe el estado con código ${errorArr}`);
    }
}

const existePost = async titulo => {
    const existePost = await Post.findOne({titulo, estado: true});

    if(existePost){
        throw new Error(`Ya existe un post con el título ${titulo}`);
    }
}

const existePostId = async id => {
    const existePost = await Post.findOne({_id: id, estado: true});

    if(!existePost){
        throw new Error(`No existe un post con el id ${id}`);
    }
}

module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioByID,
    existeCategoriaPorNombre,
    existeCultivo,
    existeCultivoId,
    existeCategoriaId,
    categoriaExiste,
    existenEstados,
    existePost,
    existePostId
}
const { response } = require("express");
const Categoria = require('../models/categoria');
const Cultivo = require('../models/cultivo');

const obtenerCategoriaId = async (req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findById(id);

    res.json({
        categoria
    });
}

const obtenerCategorias = async (req, res = response) =>{
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        total,
        categorias
    });
}

const crearCategoria = async (req, res = response) => {
    const { nombre } = req.body;

    const categoria = new Categoria({ nombre });

    await categoria.save();

    res.json({
        msg: 'Categoría creada correctamente'
    });
}

const actualizarCategoria = async (req, res = response) => {
    const { nombre } = req.body;
    const { id } = req.params;

    const categoria = await Categoria.findById(id);
    await Categoria.findByIdAndUpdate(id, { nombre });

    await Cultivo.updateMany({ categoria: categoria.nombre }, {categoria: nombre});

    res.json({
        msg: 'Categoría actualizada correctamente'
    });
}

const eliminarCategoria = async (req, res = response) => {
    const { id } = req.params;

    const { nombre } = await Categoria.findById(id);
    const  categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    
    if(!categoria){
        return res.json({msg: `La categoría con id ${id} no existe`});
    }

    await Cultivo.updateMany({ categoria: nombre }, { estado: false });

    res.json({
        msg: 'Categoría eliminada correctamente'
    });
}

module.exports = {
    actualizarCategoria,
    crearCategoria,
    eliminarCategoria,
    obtenerCategorias,
    obtenerCategoriaId
}
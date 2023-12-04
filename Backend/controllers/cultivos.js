const { response } = require("express");

const Cultivo = require("../models/cultivo");

const accessPanel = (req, res = response) => {
    res.status(200).json({msg: 'ok'});
}

const obtenerCultivos = async (req, res = response) => {
    const query = { estado: true };

    const [ total, cultivos ] = await Promise.all([
        Cultivo.countDocuments(query),
        Cultivo.find(query)
    ]);

    res.json({
        total,
        cultivos
    });
}

const obtenerCultivoId = async (req, res = response) => {
    const cultivo = await Cultivo.findById(req.params.id);

    res.json({
        msg: 'ok',
        cultivo
    })
}

const crearCultivo = async (req, res = response) => {
    const { nombre, descripcion, condiciones_cultivo, cuidados_mantenimiento, fecha_siembra, fecha_cosecha, categoria, estados } = req.body;

    const cultivo = new Cultivo({nombre, descripcion, condiciones_cultivo, cuidados_mantenimiento, fecha_siembra, fecha_cosecha, categoria, estados});

    await cultivo.save();

    res.json({
        msg: 'Cultivo creado correctamente',
        cultivo
    });
}

const actualizarCultivo = async (req, res = response) => {
    const { nombre, descripcion, condiciones_cultivo, cuidados_mantenimiento, fecha_siembra, fecha_cosecha, categoria, estados } = req.body;
    const { id } = req.params;

    const cultivo = await Cultivo.findByIdAndUpdate(id, {nombre, descripcion, condiciones_cultivo, cuidados_mantenimiento, fecha_siembra, fecha_cosecha, categoria, estados});

    res.json({
        msg: 'Cultivo actualizaado correctamente',
        cultivo
    });
}

const eliminarCultivo = async (req, res = response) => {
    const { id } = req.params;

    const cultivo = await Cultivo.findByIdAndUpdate(id, {estado: false});

    if(!cultivo){
        return res.json({msg: `El cultivo con id ${id} no existe`});
    }

    res.json({
        msg: 'Cultivo eliminado correctamente'
    });
}

module.exports = {
    actualizarCultivo,
    accessPanel,
    crearCultivo,
    eliminarCultivo,
    obtenerCultivos,
    obtenerCultivoId
}
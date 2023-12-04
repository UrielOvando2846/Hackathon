const { response } = require("express");

const Estado = require('../models/estado');

const obtenerEstados = async (req, res = response) => {

    const [ total, estados ] = await Promise.all([
        Estado.countDocuments(),
        Estado.find()
    ]);

    res.json({
        total,
        estados
    });
}

module.exports = {
    obtenerEstados
}
const { response } = require("express");

const Post = require('../models/post');

const obtenerPostId = async (req, res = response) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    res.json({
        post
    });
}

const obtenerPosts = async (req, res = response) => {
    const query = { estado: true };

    const [ total, posts ] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query)
    ]);

    res.json({
        total,
        posts
    });
}

const crearPost = async (req, res = response) => {
    const { titulo, info } = req.body;

    const post =  new Post({titulo, info});

    await post.save();

    res.json({
        msg: 'Post creado correctamente',
        post
    });
}

const actualizarPost = async (req, res = response) => {
    const { titulo, info } = req.body;
    const { id } = req.params;

    await Post.findByIdAndUpdate(id, { titulo, info });

    res.json({
        msg: 'Post actualizado correctamente'
    });
}

const eliminarPost = async (req, res = response) => {
    const { id } = req.params;

    await Post.findByIdAndUpdate(id, {estado: false});

    res.json({
        msg: 'Post eliminado correctamente'
    });
}

module.exports = {
    crearPost,
    obtenerPostId,
    obtenerPosts,
    actualizarPost,
    eliminarPost
}
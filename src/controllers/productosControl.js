const { getProductos, getProducto, getVariantes, getNovedades, getProductosMinos } = require('../models/productosModel');

const obtenerProductos = async (req, res, next) => {
    try {
        const productos = await getProductos();
        res.locals.productos = productos;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

const obtenerProductosMenos = async (req, res, next) => {
    try {
        const productos = await getProductosMinos(req.params.idproducto);
        res.locals.productos = productos;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

const obtenerProducto = async (req, res, next) => {
    try {
        const producto = await getProducto(req.params.idproducto);
        res.locals.producto = producto;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};

const obtenerVariantes = async (req, res, next) => {
    try {
        const producto = res.locals.producto
        const variantes = await getVariantes(producto.idproducto);
        res.locals.variantes = variantes;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener variantes de producto' });
    }
};

const obtenerNovedades = async (req, res, next) => {
    try {
        const novedades = await getNovedades();
        res.locals.novedades = novedades;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener novedades' });
    }
};

module.exports = {obtenerProductos, obtenerProducto, obtenerVariantes, obtenerNovedades, obtenerProductosMenos};

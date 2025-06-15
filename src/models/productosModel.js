const { Client } = require('pg');
const bdconfig = require('../config/db.config');

const getProductos = async() => {
    const cliente = new Client(bdconfig);
    
    try{
        await cliente.connect();
        
        const query = `select * from productos where idestado = 1`;
        
        const resultado = await cliente.query(query);
        return resultado.rows
    } catch (error) {
        console.error(error);
        throw error;    
    } finally {
        await cliente.end();
    }
};

const getProductosMinos = async(idproducto) => {
    const cliente = new Client(bdconfig);
    try {
        await cliente.connect();
        const query = `select * from productos 
                        where idestado = 1 and idproducto != $1
                        limit 12`;
        const resultado = await cliente.query(query, [idproducto]);
        return resultado.rows
    } catch (error) {
        console.error(error);
        throw error;   
    } finally {
        await cliente.end();
    }
};

const getProducto = async(idproducto) => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `select * from productos where idestado = 1 and idproducto = $1`
        const resultado = await cliente.query(query, [idproducto]);
        return resultado.rows[0]
    } catch (error) {
        console.error(error);
        throw error;   
    } finally {
        await cliente.end();
    }
};

const getVariantes = async(idproducto) => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `select inventario.idinventario as id, inventario.idtalla, tallas.descripcion_talla as talla, inventario.idcolor, colores.descripcion_color as color, inventario.cantidad as cantidad from inventario
        inner join tallas on tallas.idtalla = inventario.idtalla
        inner join colores on colores.idcolor = inventario.idcolor
        where inventario.idproducto = $1 and inventario.idestado = 1`;
        
        const resultado = await cliente.query(query, [idproducto]);
        return resultado.rows
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await cliente.end();
    }
};

const getNovedades = async() => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `select * from productos where idestado = 1 order by fecha_creacion desc limit 12`;
        
        const resultado = await cliente.query(query);
        return resultado.rows
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await cliente.end();
    }
};

module.exports = {getProductos, getProducto, getVariantes, getNovedades, getProductosMinos};

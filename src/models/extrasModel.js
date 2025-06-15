const { Client } = require('pg');
const bdconfig = require('../config/db.config');

const getDepartamentos = async() => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `select * from departamentos`;

        const resultado = await cliente.query(query);
        return resultado.rows
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await cliente.end();
    }
};

const getMunicipios = async(iddepartamento) => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `select * from municipios where iddepartamento = $1`;

        const resultado = await cliente.query(query, [iddepartamento]);
        return resultado.rows
    } catch (error) {
        console.error(error);
        throw error;    
    } finally {
        await cliente.end();
    }
};

const getTotalBolsa = async(idusuario) => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `
            SELECT SUM(productos_bolsa.cantidad) FROM productos_bolsa 
            INNER JOIN bolsas ON productos_bolsa.idbolsa = bolsas.idbolsa 
            WHERE bolsas.idusuario = $1 and bolsas.idestado = 1`;
        
        const resultado = await cliente.query(query, [idusuario]);
        return resultado.rows[0].sum || 0
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await cliente.end();
    }
};

const getTotalFavoritos = async(idusuario) => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `
            SELECT COUNT(*) FROM productos_favoritos
            WHERE idusuario = $1`;
        
        const resultado = await cliente.query(query, [idusuario]);
        return parseInt(resultado.rows[0].count)
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await cliente.end();
    }
};

const getTotalPedidos = async(idusuario) => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `
            SELECT COUNT(*) FROM ventas
            WHERE idusuario = $1 AND fecha_hora BETWEEN NOW() - INTERVAL '30 days' AND NOW()
        `;
        
        const resultado = await cliente.query(query, [idusuario]);
        return parseInt(resultado.rows[0].count)
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await cliente.end();
    }
};

const getTotalPagado = async(idusuario) => {
    const cliente = new Client(bdconfig);
    
    try {
        await cliente.connect();
        
        const query = `
            SELECT SUM(productos.precio * productos_bolsa.cantidad) FROM ventas
            INNER JOIN bolsas ON ventas.idbolsa = bolsas.idbolsa
            INNER JOIN productos_bolsa ON productos_bolsa.idbolsa = bolsas.idbolsa
            INNER JOIN inventario ON productos_bolsa.idinventario = inventario.idinventario
            INNER JOIN productos ON productos.idproducto = inventario.idproducto
            WHERE ventas.idusuario = $1 AND ventas.fecha_hora BETWEEN NOW() - INTERVAL '30 days' AND NOW()
        `;
        
        const resultado = await cliente.query(query, [idusuario]);
        return resultado.rows[0].sum || 0
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await cliente.end();
    }
};

module.exports = {getDepartamentos, getMunicipios, getTotalBolsa, getTotalFavoritos, getTotalPedidos, getTotalPagado};

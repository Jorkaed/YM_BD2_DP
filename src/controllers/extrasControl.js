const { getDepartamentos, getMunicipios, getTotalBolsa, getTotalFavoritos, getTotalPedidos, getTotalPagado } = require('../models/extrasModel');

const obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = await getDepartamentos();
        res.json(departamentos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener departamentos' });
    }
};

const obtenerMunicipios = async (req, res) => {
    try {
        const municipios = await getMunicipios(req.params.iddepartamento);
        res.json(municipios);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener municipios' });
    }
};

const obtenerInformacion = async (req,res) => {
    const id = req.params.idusuario;
    try {
        const [bolsa, favoritos, pedidos, pagado] = await Promise.all([
            getTotalBolsa(id),
            getTotalFavoritos(id),
            getTotalPedidos(id),
            getTotalPagado(id)
        ]);
        res.json({
            bolsa,
            favoritos,
            pedidos,
            pagado
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la información del usuario' });
    }
};

module.exports = { obtenerDepartamentos, obtenerMunicipios,  obtenerInformacion };

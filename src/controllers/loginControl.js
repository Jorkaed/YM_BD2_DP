const { verificarUsuario, verificarContrasena } = require('../models/usuarioModel');
const { validationResult } = require('express-validator');

const loguearUsuario = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array().map(err => ({
                msg: err.msg,
                param: err.path
            }))
        });
    }

    const { email, contrasena } = req.body;

    try {
        const yaExiste = await verificarUsuario(email);
        if (!yaExiste) {
            return res.status(400).json({ errores: [{ param: 'email', msg:  'El correo no está registrado.'}] });
        }

        const usuario = await verificarContrasena(email, contrasena);

        if (!usuario) {
            return res.status(401).json({ errores: [{ param: 'contrasena', msg: 'Contraseña incorrecta.' }] });
        }
        
    req.session.usuario = {
        id: usuario.idusuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        fecha_nacimiento: usuario.fecha_nacimiento,
        tipo: usuario.idtipousuario,
        cargo: usuario.cargo,
        imagen: usuario.imagen_perfil || '/img/img_dashboard/hacker.png'
    };

        console.log(req.session.usuario);
        res.status(201).json({ success: true, message: 'Logueo exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errores: [{ msg: 'Error al loguearse'}] });
    }
};

module.exports = { loguearUsuario };


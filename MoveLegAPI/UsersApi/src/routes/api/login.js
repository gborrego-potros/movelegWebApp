//Micro servicio validar credenciales

const router = require('express').Router();
const { Usuario } = require('../../db');

router.post('/', async (req, res) => {
    const { correo, contrasenia } = req.body;
  
    try {
      const usuario = await Usuario.findOne({ correo });
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      if (usuario.contrasenia !== contrasenia) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }
  
      
      res.status(200).json({ mensaje: 'Login exitoso', correo: usuario.correo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  });
  
  module.exports = router;
  
//Micro servicio validar credenciales

const router = require('express').Router();
const { Usuario } = require('../../db');

router.post('/', async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      const respuesta = { mensaje: 'Usuario no encontrado' };
      console.log('Respuesta:', respuesta);
      return res.status(404).json(respuesta);
    }

    if (usuario.contrasenia !== contrasenia) {
      const respuesta = { mensaje: 'Contraseña incorrecta' };
      console.log('Respuesta:', respuesta);
      return res.status(401).json(respuesta);
    }
     
    const respuesta = {//SOLO SE NECESITA EL MENSAJE COMO RESPUESTA AL JUEGO - EVITAR TRABAJO INNECESARIO 
      mensaje: "Login exitoso"
    };
    
    console.log("Respuesta:", JSON.stringify(respuesta));
    return res.status(200).json(respuesta);
    
        

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

  
  module.exports = router;
  
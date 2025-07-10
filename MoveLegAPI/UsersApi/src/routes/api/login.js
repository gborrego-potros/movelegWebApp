//Micro servicio validar credenciales

const router = require('express').Router();
const { Usuario } = require('../../db');
const jwt = require('jsonwebtoken')//Se importa JWT

const CLAVE_SECRETA = 'ya_termino_el_proximo_semestre_animo';

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
  //Crear el token
  const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      CLAVE_SECRETA,
      { expiresIn: '1h' } // Expira en 1 hora
    );
    
    //Devolver el token junto con el mensaje
    return res.status(200).json({ mensaje: 'Login exitoso', token });
  
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

  
  module.exports = router;
  
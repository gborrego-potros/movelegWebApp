//Micro servicio solicitar configuracion - adaptar

const router = require('express').Router();
const { ConfiguracionSesion } = require('../../db');
const { Usuario } = require('../../db');
//const { Paciente } = require('../../db');

router.post('/', async (req, res) => {
  const {correo} = req.body;//en el cuerpo de la petición que se haga del juego va solo el correo

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
//VALIDACIONES NECESARIAS
    if (!usuario) {
      const respuesta = { mensaje: 'Usuario no encontrado' };
      console.log('Respuesta:', respuesta);
      return res.status(404).json(respuesta);
    }

      const configuracion = await ConfiguracionSesion.findOne({ where: { usuarioId: usuario.id } });
    
      if (configuracion) {
        const respuesta = {
          numRepTobillo: configuracion.numRepeticionesTobillo,
          numRepRodilla: configuracion.numRepeticionesRodilla,
          porcentajeDisminucionRD: configuracion.porcentajeDisminucionRD,
          porcentajeDisminucionTD: configuracion.porcentajeDisminucionTD,
          porcentajeDisminucionRV: configuracion.porcentajeDisminucionRV,
          porcentajeDisminucionTV: configuracion.porcentajeDisminucionTV
        };
    
        console.log("Respuesta:", JSON.stringify(respuesta));
        return res.status(200).json(respuesta);
      } else {
        const respuesta = { mensaje: 'Paciente no tiene terapia recetada' };
        console.log('Respuesta:', respuesta);
        return res.status(404).json(respuesta);//Cambiar esto a 200//no recuerdo por que puse esto
      }
    
    
//*********************************************************************/
        

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


//VALIDAR SI EXISTE TERAPIA RECETADA Y DEVOLVER MENSAJE*********************************************
router.post('/SolicitarTerapia', async (req, res) => {
  const {correo} = req.body;//en el cuerpo de la petición que se haga del juego va solo el correo

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
//VALIDACIONES NECESARIAS
    if (!usuario) {
      const respuesta = { mensaje: 'Usuario no encontrado' };
      console.log('Respuesta:', respuesta);
      return res.status(404).json(respuesta);
    }

      const configuracion = await ConfiguracionSesion.findOne({ where: { usuarioId: usuario.id } });
    
      if (configuracion) {
        const respuesta = { mensaje: 'Paciente si tiene terapia recetada' };
        console.log('Respuesta:', respuesta);
        return res.status(200).json(respuesta);
      } else {
        const respuesta = { mensaje: 'Paciente no tiene terapia recetada' };
        console.log('Respuesta:', respuesta);
        return res.status(404).json(respuesta);
      }
    
    
//*********************************************************************/
        

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

  module.exports = router;
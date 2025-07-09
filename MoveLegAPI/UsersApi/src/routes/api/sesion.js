const router = require ('express').Router();

const {Sesion} = require('../../db');

router.get('/', async (req, res)=>{
    const resultado = await Sesion.findAll();
    res.json(resultado);
});

//Se utilizara para guardar la sesión al finalizar la terapia
router.post('/', async(req, res) => {
    //CUERPO DE LA PETICION DEL JUEGO SERIO
    const { 
        promedioVelocidadRodilla, 
        promedioVelocidadTobillo, 
        posicionRodillaMin,
        posicionRodillaMax,
        anguloTobilloMin,
        anguloTobilloMax,
        numRepeticionesTobillo, 
        numRepeticionesRodilla } = req.body;
try{
// Crear nuevo resultado de terapia asociado al usuario
    const nuevoRegistro = await Sesion.create({
      promedioVelocidadRodilla,
      promedioVelocidadTobillo,
      posicionRodillaMin,
      posicionRodillaMax,
      anguloTobilloMin,
      anguloTobilloMax,
      numRepeticionesTobillo,
      numRepeticionesRodilla
    });

res.status(201).json(nuevoRegistro);
}catch(error){
console.error(error);
res.status(500).json({ error: 'Error al guardar resultado de terapia' });  
}

});

router.put('/:calibracionId', async(req, res) => {
    await Sesion.update(req.body, {
        where: {id: req.params.resultadoSesionId}
    });
    console.log(req.body);
    res.json({success:'Se ha modificado'})
});


module.exports = router;
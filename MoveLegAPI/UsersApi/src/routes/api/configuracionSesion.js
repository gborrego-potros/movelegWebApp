const router = require ('express').Router();

const { ConfiguracionSesion } = require('../../db');

router.get('/', async (req, res)=>{
    const configuracion = await ConfiguracionSesion.findAll();
    res.json(configuracion);
});

router.post('/', async(req, res) => {
    //const idTerapia = req.params.idTerapia;
    console.log(req.body);
    const configuracion = await ConfiguracionSesion.create(req.body);
    res.json(configuracion);
});

router.post('/idTerapia', async(req, res) => {
    //const idTerapia = req.params.idTerapia;
    console.log(req.body);
    const configuracion = await ConfiguracionSesion.create(req.body);
    res.json(configuracion);
});

router.put('/:calibracionId', async(req, res) => {
    await ConfiguracionSesion.update(req.body, {
        where: {id: req.params.configuracionSesionId}
    });
    res.json({success:'Se ha modificado'})
});


module.exports = router;
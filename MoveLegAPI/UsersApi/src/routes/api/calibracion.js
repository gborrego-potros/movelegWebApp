const router = require ('express').Router();

const { Calibracion } = require('../../db');

router.get('/', async (req, res)=>{
    const calibracion = await Calibracion.findAll();
    res.json(calibracion);
});

router.post('/', async(req, res) => {
    const calibracion = await Calibracion.create(req.body);
    res.json(calibracion);
});

router.put('/:calibracionId', async(req, res) => {
    await Calibracion.update(req.body, {
        where: {id: req.params.calibracionId}
    });
    res.json({success:'Se ha modificado'})
});


module.exports = router;
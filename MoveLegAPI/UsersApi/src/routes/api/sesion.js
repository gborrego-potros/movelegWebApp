const router = require ('express').Router();

const {ResultadoSesion } = require('../../db');

router.get('/', async (req, res)=>{
    const resultado = await ResultadoSesion.findAll();
    res.json(resultado);
});

router.post('/', async(req, res) => {
    const resultado = await ResultadoSesion.create(req.body);
    res.json(resultado);
});

router.put('/:calibracionId', async(req, res) => {
    await ResultadoSesion.update(req.body, {
        where: {id: req.params.resultadoSesionId}
    });
    res.json({success:'Se ha modificado'})
});


module.exports = router;
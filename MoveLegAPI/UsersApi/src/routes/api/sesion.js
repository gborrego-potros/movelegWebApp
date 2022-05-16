const router = require ('express').Router();

const {Sesion} = require('../../db');

router.get('/', async (req, res)=>{
    const resultado = await Sesion.findAll();
    res.json(resultado);
});

router.post('/', async(req, res) => {
    const resultado = await Sesion.create(req.body);
    res.json(resultado);
});

router.put('/:calibracionId', async(req, res) => {
    await Sesion.update(req.body, {
        where: {id: req.params.resultadoSesionId}
    });
    console.log(req.body);
    res.json({success:'Se ha modificado'})
});


module.exports = router;
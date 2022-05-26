const router = require ('express').Router();

const { Terapia } = require('../../db');

router.get('/', async (req, res)=>{
    const terapia = await Terapia.findAll();
    res.json(terapia);
});

router.get('/:idTerapia', async (req, res)=>{
    const terapia = await Terapia.findByPk(req.params.idTerapia);
    res.json(terapia);
});

router.post('/', async(req, res) => {


    
    //req.body.paciente
    console.log(req.body.terapia);
    const terapia= await Terapia.create(req.body.terapia);
    res.json(terapia);
});

router.put('/:terapiaId', async(req, res) => {
    await Terapia.update(req.body, {
        where: {id: req.params.terapiaId}
    });
    res.json({success:'Se ha modificado'})
});


module.exports = router;
const router = require ('express').Router();

const { Usuario } = require('../../db');

router.get('/', async (req, res)=>{
    const users = await Usuario.findAll();
    res.json(users);
});

router.post('/', async(req, res) => {
    const user = await Usuario.create(req.body);
    res.json(user);
});

router.put('/:userId', async(req, res) => {
    await Usuario.update(req.body, {
        where: {id: req.params.userId}
    });
    res.json({success:'Se ha modificado'})
});


module.exports = router;
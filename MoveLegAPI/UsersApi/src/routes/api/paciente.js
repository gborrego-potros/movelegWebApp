const router = require ('express').Router();

const { Paciente } = require('../../db');
const {Configuracion}= require('../../db')

router.get('/', async (req, res)=>{
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
});

router.get('/:nombre', async (req, res)=>{
    const nom=req.params.nombre;
    console.log(nombre);
    const pacientes = await Paciente.findAll({
        where: {
            nombre: sequelize.where(sequelize.fn('LOWER', sequelize.col('nombre')), 'LIKE', '%' + nom.toLowerCase() + '%')
        }
    });
    res.json(pacientes);
});

router.post('/', async(req, res) => {
    //req.body.paciente
    const paciente = await Paciente.create(req.body);
    res.json(paciente);
});

router.put('/:pacienteId', async(req, res) => {
    await Paciente.update(req.body, {
        where: {id: req.params.pacienteId}
    });
    res.json({success:'Se ha modificado'})
});


module.exports = router;
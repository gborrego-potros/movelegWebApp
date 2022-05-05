const router = require ('express').Router();

const { response } = require('express');
const { Paciente } = require('../../db');
const {Configuracion}= require('../../db')

router.get('/', async (req, res)=>{
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
});

router.get('/:pacienteId', async (req, res)=>{
    const pacientes = await Paciente.findByPk(req.params.pacienteId);
    res.json(pacientes);
});

//se utiliza el metodo put para buscar, ya que por medio del metodo get no puedo enviar nada en el body
router.put('/nombre', async (req, res)=>{
    console.log(req.body.nombre);
    const pacientes = await Paciente.findAll({
        where: {
          nombre: req.body.nombre
        }
      });
    res.json(pacientes);
});

router.post('/', async(req, res) => {
    //req.body.paciente
    //console.log(req.body);
    const paciente = await Paciente.create(req.body);
    res.json(paciente);
});

router.put('/:pacienteId', async(req, res) => {
    await Paciente.update(req.body, {
        where: {id: req.params.pacienteId}
    });
    res.json({success:'Se ha modificado'})
});

router.delete('/:pacienteId', async (req, res)=>{
    await Paciente.destroy({
        where: {id: req.params.pacienteId}
    })
    res.json({success:'Se ha borrado el usuario'})
});

module.exports = router;
const router = require ('express').Router();
const { Op } = require('sequelize');
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
router.put('/correo', async (req, res)=>{
    console.log(req.body.correo);
    const paciente = await Paciente.findOne({
        where: {
          correo: req.body.correo
        }
      });
    if(paciente.contrasenia == req.body.contrasenia){
        res.json(paciente);
    }
    res.json(null);
});

router.put('/nombre', async (req, res)=>{
    console.log(req.body);
    const pacientes = await Paciente.findAll({
        where: {
            nombre:{
                [Op.iLike]:`%${req.body.nombre}%`
            }
        }
      });
    res.json(pacientes);
});

router.post('/', async(req, res) => {
    //req.body.paciente
    console.log(req.body);
    const paciente = await Paciente.create(req.body);
    console.log(paciente);
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
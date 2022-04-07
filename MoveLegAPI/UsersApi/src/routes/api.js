const router = require ('express').Router();

const apiUsersRouter = require('./api/users');
const apiPacienteRouter = require('./api/paciente');
const apiCalibracionRouter = require('./api/calibracion');
const apiTerapiaRouter = require('./api/terapias');
const apiSesionRouter = require('./api/sesion');
const apiConfiguracionRouter = require('./api/configuracionSesion');


router.use('/users',apiUsersRouter);
router.use('/calibraciones', apiCalibracionRouter);
router.use('/terapias', apiTerapiaRouter);
router.use('/sesiones', apiSesionRouter);
router.use('/configuracionsesiones', apiConfiguracionRouter);
router.use('/pacientes', apiPacienteRouter);

module.exports = router;


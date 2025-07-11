const router = require ('express').Router();

const apiUsersRouter = require('./api/users');
const apiPacienteRouter = require('./api/paciente');
const apiCalibracionRouter = require('./api/calibracion');
const apiTerapiaRouter = require('./api/terapias');
const apiSesionRouter = require('./api/sesion');
const apiConfiguracionRouter = require('./api/configuracionSesion');
//Micro servicio validar credenciales
const apiLoginRouter = require('./api/login');

router.use('/users',apiUsersRouter);
router.use('/calibraciones', apiCalibracionRouter);
router.use('/terapias', apiTerapiaRouter);
router.use('/sesiones', apiSesionRouter);

//Micro servicio solicitar configuraciones
router.use('/configuracionsesiones', apiConfiguracionRouter);

router.use('/pacientes', apiPacienteRouter);

//Micro servicio validar credenciales
router.use('/login', apiLoginRouter);

module.exports = router;


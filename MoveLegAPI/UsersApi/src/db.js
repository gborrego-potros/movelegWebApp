const Sequelize = require("sequelize");

const UsersModel = require("./models/Users");
const TerapiaModel = require("./models/Terapia");
const SesionModel = require("./models/Sesion");
const ConfiguracionSesionModel = require("./models/ConfiguracionSesion");
const CalibracionModel = require("./models/Calibracion");
const PacienteModel = require("./models/Paciente");

require('dotenv').config();
const password = process.env.MYSQL;
const host = process.env.HOST;

const sequelize = new Sequelize("moveleg", "root", password, {
  host: host,
  dialect: "mysql",
});

const User = UsersModel(sequelize, Sequelize);
const Paciente = PacienteModel(sequelize, Sequelize);
const Terapia = TerapiaModel(sequelize, Sequelize);
const Sesion = SesionModel(sequelize, Sequelize);
const ConfiguracionSesion = ConfiguracionSesionModel(sequelize, Sequelize);
const Calibracion = CalibracionModel(sequelize, Sequelize);


sequelize.sync({ force: false }).then(() => {
  console.log("tablas sincronizadas");
});

module.exports={
    User,
    Paciente,
    Terapia,
    Sesion,
    ConfiguracionSesion,
    Calibracion
}
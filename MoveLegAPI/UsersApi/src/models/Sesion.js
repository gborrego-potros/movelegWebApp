const { Sesion } = require("../db")

module.exports = (sequelize, type) =>{
    return sequelize.define('sesion',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        promedioVelocidadTobillo:type.FLOAT,
        promedioVelocidadRodilla:type.FLOAT,
        posicionRodillaMin:type.FLOAT,
        posicionRodillaMax:type.FLOAT,
        anguloTobilloMin:type.FLOAT,
        anguloTobilloMax:type.FLOAT,
        numRepeticionesTobillo:type.FLOAT,
        numRepeticionesRodilla:type.FLOAT,
        numDisminuciones:type.INTEGER,
        fechaSesion:type.DATE,
    }
    )
}
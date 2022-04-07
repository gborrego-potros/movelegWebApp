
module.exports = (sequelize, type) =>{
    return sequelize.define('configuracionSesion',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numRepeticiones:type.INTEGER,
        numRepeticionesTobillo:type.INTEGER,
        porcentajeDisminucionRD:type.FLOAT,
        porcentajeDisminucionTD:type.FLOAT,
        porcentajeDisminucionTV:type.FLOAT,
        porcentajeDisminucionRV:type.FLOAT
    }
    )
}
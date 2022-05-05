
module.exports = (sequelize, type) =>{
    return sequelize.define('calibracion',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idTerapia:type.INTEGER,
        anguloFlexionCadera:type.FLOAT,
        anguloFlexionRodilla:type.FLOAT,
        anguloDorsiflexion:type.FLOAT,
        anguloPlantarFlexion:type.FLOAT
    }
    )
}
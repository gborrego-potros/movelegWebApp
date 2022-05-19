
module.exports = (sequelize, type) =>{
    return sequelize.define('calibracion',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idTerapia:type.INTEGER,
        anguloFlexionCadera:type.INTEGER,
        anguloFlexionRodilla:type.INTEGER,
        anguloDorsiflexion:type.INTEGER,
        anguloPlantarFlexion:type.INTEGER
    }
    )
}
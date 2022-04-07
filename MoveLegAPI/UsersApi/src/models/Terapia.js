
module.exports = (sequelize, type) =>{
    return sequelize.define('terapia',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPaciente:type.INTEGER,
        fechaInicio: type.DATE,
        fechaFin:type.DATE
    }
    )
}
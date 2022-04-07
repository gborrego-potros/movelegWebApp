
module.exports= (sequelize, type)=>{
    return sequelize.define('paciente',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        fechaNacimiento: type.DATE,
        piernaAfectada: type.STRING,
        patologia: type.STRING
    }, { sequelize, modelName: 'paciente' }
    )    
}


module.exports= (sequelize, type)=>{
    return sequelize.define('user',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        fechaNacimiento: type.DATE,
        contrasenia:type.STRING
    }, { sequelize, modelName: 'user' }
    )    
}

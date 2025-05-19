
module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        fechaNacimiento: type.DATE,
        correo: type.STRING,
        contrasenia: type.STRING,

        pacienteId: {
            type: type.INTEGER,
            references: {
                model: 'pacientes',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    })
}


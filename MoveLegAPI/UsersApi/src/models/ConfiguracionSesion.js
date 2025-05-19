
module.exports = (sequelize, type) => {
    return sequelize.define('configuracionSesion', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idTerapia: type.INTEGER,
        numRepeticionesTobillo: type.INTEGER,
        numRepeticionesRodilla: type.INTEGER,
        porcentajeDisminucionRD: type.FLOAT,
        porcentajeDisminucionTD: type.FLOAT,
        porcentajeDisminucionTV: type.FLOAT,
        porcentajeDisminucionRV: type.FLOAT,

        usuarioId: {
            type: type.INTEGER,
            references: {
                model: 'usuarios', // nombre exacto de la tabla
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    }, {
        sequelize,
        modelName: 'configuracionSesion',
        tableName: 'configuracionsesions' 
    });
};

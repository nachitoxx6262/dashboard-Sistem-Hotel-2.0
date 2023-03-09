const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "History",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          fecha_ingreso: {
            type: DataTypes.DATEONLY,
            allowNull: false
          },
          fecha_salida: {
            type: DataTypes.DATEONLY,
            allowNull: false
          }
    
    },
  );
};

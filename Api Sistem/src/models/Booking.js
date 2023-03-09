const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_salida: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

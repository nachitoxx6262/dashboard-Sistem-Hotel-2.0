const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      number_room: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("full", "free", "maintenance"),
        unique: false,
        allowNull: false,
      }
    },
  );
};

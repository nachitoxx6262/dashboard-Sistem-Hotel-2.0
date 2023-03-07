const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Cliente",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      dni: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      birthdate:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      tel:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      blacklist:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      email:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      description:{
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
    },
  );
};

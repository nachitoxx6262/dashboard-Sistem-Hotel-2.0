const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("OccupationHistory", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      from: {
        type: DataTypes.DATE,
        allowNull: false
      },
      to: {
        type: DataTypes.DATE,
        allowNull: false
      },
  });
};

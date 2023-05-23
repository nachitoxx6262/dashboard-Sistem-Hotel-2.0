const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OccupationHistory = sequelize.define("OccupationHistory", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      room: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      clientsId: {
        type:DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      from: {
        type: DataTypes.DATE,
        allowNull: true
      },
      to: {
        type: DataTypes.DATE,
        allowNull: true
      },
  });
};

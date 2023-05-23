const { DataTypes } = require("sequelize");
const OccupationHistory = require("./OccupationHistory");

module.exports = (sequelize) => {
  const Occupation = sequelize.define("Occupation", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    to: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    occupants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pay:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

};

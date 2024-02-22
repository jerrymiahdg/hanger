const sequelize = require("../db");

const Sequelize = require("sequelize");

const ClothingItem = sequelize.define("clothingItems", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numWears: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  wearsUntilWash: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ClothingItem;

const Sequelize = require("sequelize");

const sequelize = new Sequelize("clocatdb", "root", "jeremiah", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

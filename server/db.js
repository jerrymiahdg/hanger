const Sequelize = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

// const sequelize = new Sequelize(
//   "railway",
//   "root",
//   "6532E2BF2hA42546EeF5ce-cB2h35GEf",
//   {
//     host: "viaduct.proxy.rlwy.net",
//     dialect: "mysql",
//   }
// );

// const sequelize = new Sequelize(
//   "mysql://root:6532E2BF2hA42546EeF5ce-cB2h35GEf@mysql.railway.internal:3306/railway"
// );

module.exports = sequelize;

const dbConfig = require("../config/dbConfig");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.DBPASSWORD, {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: dbConfig.dBDialect,
  logging: dbConfig.dBLogging,
  //operatorsAliases: false,

  pool: {
    max: dbConfig.dBPool.max,
    min: dbConfig.dBPool.min,
    acquire: dbConfig.dBPool.acquire,
    idle: dbConfig.dBPool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.soldItemModel = require("./soldItemModel.js")(sequelize, Sequelize);

module.exports = db;

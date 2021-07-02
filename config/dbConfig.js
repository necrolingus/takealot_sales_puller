var config = {}
require('dotenv').config();


config = {
  dBLogging: false,
  dBdialectOptionsuseUTC: true,
  forceDbRecreate: true,
  dBDialect: 'mysql',
  dBDialectOptions: {
    useUTC: true, //for reading from database
  },
  dBPool: {
    max: 25,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
  timezone: '+00:00'
}

module.exports = config;
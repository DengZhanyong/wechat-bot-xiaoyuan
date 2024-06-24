const { Sequelize } = require("sequelize");
const dev = require("./config");

const { host, user, password, database } = dev.mysqlConf;

const db = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
    logging: false,
});

module.exports = db;

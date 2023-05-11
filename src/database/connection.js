const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = require('../config');

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  dialectOptions: {
    ssl: false,
    multipleStatements: false
  }
})

db.authenticate()
  .then(() => {
    console.log("Database connection successful");
})
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
});

db.sync({ logging: false, force: false })
  .then(() => {
    console.log("Database synchronized");
})
  .catch((error) => {
    console.error("Unable to sync database:", error);
});

module.exports = db;
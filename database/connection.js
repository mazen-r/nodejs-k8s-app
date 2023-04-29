const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://postgres:123@localhost:5432', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
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
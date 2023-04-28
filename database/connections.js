const { Sequelize } = require('sequelize');

const connectDB = async () => {
    const sequelize = new Sequelize('postgres://postgres:123@localhost:5432', {
        dialect: 'postgres',
        dialectOptions: {
            ssl: false
        }
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    };
};

module.exports = connectDB;
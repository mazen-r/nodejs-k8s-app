const express = require("express");

const connectDB = require('./database/connections')
const { PORT } = require('./config')

const startServer = async () => {
    connectDB();
    const app = express();
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    }) 
};

startServer();
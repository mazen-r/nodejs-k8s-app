const express = require("express");
const { PORT } = require('./config')

const startServer = () => {
    const app = express();

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    }) 
};

startServer();
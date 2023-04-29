const express = require("express");
const bodyParser = require("body-parser");
const expressWinston = require('express-winston');

const userRoute = require('./routes/userRoutes');
const logger = require('./utils/logger');

const app = express();

app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRoute);

app.use((err, req, res, next) => {
  res.status(500).json({error: 'Internal server error!'});
});

module.exports = app;
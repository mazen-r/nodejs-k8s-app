const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const expressWinston = require("express-winston");
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');

const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const commentRoute = require('./routes/commentRoutes');
const prometheusRoute = require('./routes/prometheusRoutes');
const logger = require('./utils/logger');
const limiter = require('./middleware/rateLimiter');

const apiSpec = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));

const app = express();

app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(limiter);

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));
app.use(prometheusRoute);

app.use((req, res, next) => {  
    res.status(404).json({error: "Coudln't find this URL!"});
});

app.use((err, req, res, next) => {
  res.status(500).json({error: 'Internal server error!'});
});

module.exports = app;
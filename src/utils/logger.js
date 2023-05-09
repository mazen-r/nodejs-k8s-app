const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    transports: [
        new transports.File({
            level: 'info',
            filename: 'logs.log'
        })
    ],
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    )
});

module.exports = logger;

const winston = require('winston');
const config = require('../config/config');

const logger = winston.createLogger({
    level: config.logging.level,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ 
            filename: 'error.log', 
            level: 'error',
            dirname: 'logs' 
        }),
        new winston.transports.File({ 
            filename: 'combined.log',
            dirname: 'logs'
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    }
};

module.exports = logger;

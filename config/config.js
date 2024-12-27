const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const validateEnv = () => {
    const required = [
        'MONGODB_URI',
        'JWT_SECRET',
        'EMAIL_SERVICE',
        'EMAIL_USER',
        'EMAIL_PASS'
    ];

    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

const config = {
    server: {
        port: parseInt(process.env.PORT, 10) || 3000,
        nodeEnv: process.env.NODE_ENV || 'development'
    },
    
    database: {
        uri: process.env.MONGODB_URI,
        uriTest: process.env.MONGODB_URI_TEST
    },
    
    jwt: {
        secret: process.env.JWT_SECRET,
        expiration: process.env.JWT_EXPIRATION || '1h'
    },
    
    email: {
        service: process.env.EMAIL_SERVICE,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        from: process.env.EMAIL_FROM
    },
    
    security: {
        rateLimit: {
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
            max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100
        },
        cors: {
            origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
        }
    },
    
    session: {
        secret: process.env.SESSION_SECRET,
        expiry: parseInt(process.env.SESSION_EXPIRY, 10) || 3600000
    },
    
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        filePath: process.env.LOG_FILE_PATH || path.join(__dirname, '../logs/app.log')
    }
};

validateEnv();

module.exports = config;

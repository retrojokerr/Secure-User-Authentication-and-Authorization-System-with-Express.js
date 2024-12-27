
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const config = require('./config/config');
const logger = require('./utils/logger');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

connectDB();


app.use(helmet());
app.use(cors({
    origin: config.security.cors.origin,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
    windowMs: config.security.rateLimit.windowMs,
    max: config.security.rateLimit.max
});
app.use('/api/', limiter);


app.use(morgan('combined', { stream: logger.stream }));


app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = config.server.port;
app.listen(PORT, () => {
    logger.info(`Server running in ${config.server.nodeEnv} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    process.exit(1);
});

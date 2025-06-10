const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean'); 
const hpp = require('hpp');          
const { connectDB } = require('./config/database');
const config = require('./config/config');        
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const professorRoutes = require('./routes/professorRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./utils/logger')
const { ValidationError, NotFoundError, AuthError } = require('./error'); // Assuming error.js is in the root

const app = express();

connectDB(); 

app.use(cookieParser());
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(helmet()); 

// API Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per 15 minutes per IP
    message: 'Too many requests from this IP, please try again after 15 minutes!'
});
app.use('/api/', apiLimiter); // Apply rate limiting to all /api/ routes

app.use(xssClean()); 
app.use(hpp()); 

app.use(cors({
    origin: config.CORS_ORIGINS.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan(
    config.NODE_ENV === 'development' ? 'dev' : 'combined',
    { stream: { 
        write: message => logger.info(message.trim()) 
    } 
} 
));

// Serve static files from the 'uploads' directory with security headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
        res.set('X-Content-Type-Options', 'nosniff'); 
    }
}));

// --- Route Mounting ---
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/professors', professorRoutes);

app.all('*', (req, res) => {
    logger.warn(`404 Not Found: ${req.originalUrl}`)
    res.status(404).json({
        success: false,
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

// --- Global Error Handling Middleware ---
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500; 
    let message = err.message || 'Something went wrong on the server!';

    if (err instanceof ValidationError) 
        {
        statusCode = err.statusCode; // Will be 400
        message = err.message; 
        logger.debug(`Validation Error: ${message}`, { url: req.originalUrl, method: req.method, ip: req.ip, validationErrors: err.errors });
    } 
    else if (err instanceof NotFoundError) 
        {
        statusCode = err.statusCode; // Will be 404
        message = err.message; 
        logger.info(`Not Found Error: ${message}`, { url: req.originalUrl, method: req.method, ip: req.ip }); // Log info for 404s, not error
    } 
    else if (err instanceof AuthError) 
        {
        statusCode = err.statusCode; // Will be 401
        message = err.message; 
        logger.warn(`Authentication Error: ${message}`, { url: req.originalUrl, method: req.method, ip: req.ip }); // Log as warning
    } 
    else 
    {
        statusCode = res.statusCode === 200 ? 500 : statusCode;
        message = config.NODE_ENV === 'production' && statusCode === 500 ? 'Something went wrong on the server!' : err.message;
    }

    logger.error(`Error ${statusCode}: ${message}`, {
        type: err.name, // e.g., 'ValidationError', 'Error'
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
    });

    res.status(statusCode).json({
        success: false,
        message: message, 
        stack: config.NODE_ENV === 'production' ? undefined : err.stack, 
    });
});

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    logger.infog(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});
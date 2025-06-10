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
    logger.error(`Unhandled error: ${err.message}`, { // <--- Changed here
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
    })

    const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Something went wrong on the server!',
        stack: config.NODE_ENV === 'production' ? undefined : err.stack,
    });
});

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    logger.infog(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});
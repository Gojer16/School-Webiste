const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const professorRoutes = require('./routes/professorRoutes');
const contactRoutes = require('./routes/contactRoutes');
const professorRoutes = require('./routes/professorRoutes');
const instagramRoutes = require('./routes/instagramRoutes');

const app = express();

// Security Middleware
app.use(helmet()); // Add security headers
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(xssClean()); // Sanitize user input
app.use(hpp()); // Prevent HTTP Parameter Pollution
app.use('/api/', limiter);

// Body parser with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// CORS configuration
app.use(cors({
    origin: config.CORS_ORIGINS.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging
app.use(morgan(config.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Static files with security headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
        res.set('X-Content-Type-Options', 'nosniff');
    }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/instagram', instagramRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
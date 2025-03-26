// Core dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');  // <-- Add this with other core dependencies

// Custom modules
const { connectDB } = require('./config/database'); // Database connection utility
const config = require('./config/config'); // Application configuration

// Route modules
const userRoutes = require('./routes/userRoutes'); // User-related routes
const teacherRoutes = require('./routes/teacherRoutes'); // Teacher-related routes
const contactRoutes = require('./routes/contactRoutes'); // Contact form routes
const adminRoutes = require('./routes/adminRoutes'); // Admin-related routes
const professorRoutes = require('./routes/professorRoutes'); // Professor-related routes

// Initialize Express application
const app = express();  // <-- App must be initialized first

// Then add middleware
app.use(cookieParser());  // <-- Now this comes AFTER app initialization
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Development logging
if (config.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Use Morgan logger in development mode
}

// Route mounting
app.use('/api/users', userRoutes); // Mount user routes
app.use('/api/teachers', teacherRoutes); // Mount teacher routes
app.use('/api/contact', contactRoutes); // Mount contact routes
app.use('/api/admins', adminRoutes); // Mount admin routes
app.use('/api/professors', professorRoutes); // Mount professor routes

// Error handling middleware
app.use((err, req, res, next) => {
    // Determine appropriate status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    
    // Return error response
    res.json({
        message: err.message,
        stack: config.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
});

// Server configuration
const PORT = config.PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});
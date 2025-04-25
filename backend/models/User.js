const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');
const { ValidationError } = require('../errors');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 100],
                msg: 'Password must be between 8 and 100 characters'
            },
            isStrongPassword(value) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
                if (!passwordRegex.test(value)) {
                    throw new ValidationError('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character');
                }
            }
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin', 'teacher'),
        defaultValue: 'user'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    loginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lockUntil: {
        type: DataTypes.DATE,
        allowNull: true
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Instance methods
User.prototype.matchPassword = async function(enteredPassword) {
    // Check if account is locked
    if (this.isLocked()) {
        throw new ValidationError('Account is locked. Please try again later.');
    }

    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    
    if (!isMatch) {
        // Increment login attempts
        this.loginAttempts += 1;
        if (this.loginAttempts >= 5) {
            this.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
        }
        await this.save();
        throw new ValidationError('Invalid password');
    }

    // Reset login attempts on successful login
    this.loginAttempts = 0;
    this.lastLogin = new Date();
    await this.save();

    return true;
};

User.prototype.isLocked = function() {
    return this.lockUntil && this.lockUntil > Date.now();
};

User.prototype.passwordChangedAfter = function(timestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return timestamp < changedTimestamp;
    }
    return false;
};

module.exports = User;
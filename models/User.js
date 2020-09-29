const mongoose = require('mongoose');

// This defines the users table structure
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

// This creates a user model
const User = mongoose.model('User', UserSchema);

module.exports = User;


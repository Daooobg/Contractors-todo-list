const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    fullName: {
        type: String,
        lowercase: true,
        required: [true, 'Please tell us your name'],
        minlength: [5, 'Full Name must have more or equal than 5 characters'],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please tell us your email'],
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please tell us your password'],
        minlength: [6, 'Password must have more or equal than 6 characters'],
    },
    role: {
        type: String,
        enum: ['Contractor', 'Owner', 'Agent', 'Admin'],
    },
    approved: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

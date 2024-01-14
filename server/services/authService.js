const dotenv = require('dotenv');

const User = require('../models/userModel');
const jwt = require('../lib/jsonwebtoken');

dotenv.config({ path: './config.env' });

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const createAndSendToken = async (user) => {
    const payload = {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
    };
    if (SECRET && EXPIRES_IN) {
        const token = await jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

        const response = {
            AccessToken: token,
            username: user.name,
            email: user.email,
            userId: user._id,
            role: user.role,
        };
        return response;
    }
};

exports.register = async (fullName, email, password, role) => {
    console.log(fullName, email, password, role)
    const user = await User.create({ fullName, email, password, role });
    return createAndSendToken(user);
};

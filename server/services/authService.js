const dotenv = require('dotenv');

const User = require('../models/userModel');
const jwt = require('../lib/jsonwebtoken');
const AppError = require('../utils/AppError');

dotenv.config({ path: './config.env' });

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const createAndSendToken = async (user) => {
    const payload = {
        fullName: user.fullName,
        email: user.email,
        _id: user._id,
        role: user.role,
    };
    if (SECRET && EXPIRES_IN) {
        const token = await jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

        const response = {
            AccessToken: token,
            fullName: user.fullName,
            email: user.email,
            userId: user._id,
            role: user.role,
        };
        return response;
    }
};

const getUserByEmail = (email) => User.findOne({ email });

exports.register = async (fullName, email, password, role) => {
    console.log(fullName, email, password, role);
    const user = await User.create({ fullName, email, password, role });
    return createAndSendToken(user);
};

exports.login = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new AppError('Invalid Username or Password', 401, { email, password });
    }
    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
        throw new AppError('Invalid Username or Password', 401, { email, password });
    }

    if (user.approved === false) {
        throw new AppError('Your account is not approved yet!');
    }

    return createAndSendToken(user);
};

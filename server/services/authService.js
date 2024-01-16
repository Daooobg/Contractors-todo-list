const dotenv = require('dotenv');

const User = require('../models/userModel');
const jwt = require('../lib/jsonwebtoken');
const AppError = require('../utils/AppError');
const { emailService } = require('./emailService');

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

const getUserById = (_id) => User.findById({ _id });

exports.getNonAdminNonOwnerUnapprovedUsers = () => {
    return User.find({
        role: { $nin: ['Admin'] },
        approved: false,
    }).select('-password -__v');
};

exports.register = async (fullName, email, password, role) => {
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

exports.updateUserApprove = async ({ id }) => {
    try {
        const user = await getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404, { _id: id });
        }

        user.approved = true;

        await user.save();

        const emailDetails = {
            to: user.email,
            subject: 'Account approval',
            text: 'Congratulations, your account is approved. Now you can log in.',
        };

        await emailService(emailDetails);

        return {
            success: true,
            message: 'User approved successfully',
        };
    } catch (error) {
        throw new AppError('Failed to update user approval', 400, { _id: id, error });
    }
};

exports.deleteUser = async ({ id }) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new AppError('User not found', 404, { _id: id });
        }
        return {
            success: true,
            message: 'User deleted successfully',
        };
    } catch (error) {
        throw new AppError('Failed to delete user', 400, { _id: id, error });
    }
};

exports.getAllApprovedUsers = () => {
    return User.find({
        role: { $nin: ['Admin'] },
        approved: true,
    }).select('-password -__v -approved');
};

exports.updateUser = async (data) => {
    try {
        const user = await getUserById(data.id);

        if (!user) {
            throw new AppError('User not found', 404, { data });
        }

        user.disabled = data.disabled;
        user.role = data.role;

        await user.save();

        return {
            success: true,
            message: 'User approved successfully',
        };
    } catch (error) {
        throw new AppError('Failed to update user', 400, { _id: id, error });
    }
};

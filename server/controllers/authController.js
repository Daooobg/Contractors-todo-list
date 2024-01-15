const authService = require('../services/authService');
const { default: AppError } = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
    const { fullName, email, password, role } = req.body;

    if (!email || !password || !fullName || !role) {
        return next(new AppError('All fields are required', 400, req.body));
    }

    const token = await authService.register(fullName, email, password, role);

    res.status(200).json(token);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide Email and Password', 400, req.body));
    }

    const data = await authService.login(email, password);

    res.status(200).json(data);
});

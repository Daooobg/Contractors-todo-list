const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
    const { fullName, email, password, role } = req.body;
    console.log(req.body)

    if (!email || !password || !fullName || !role) {
        console.log('All fields are required');
        return;
    }

    const token = await authService.register(fullName, email, password, role);

    res.status(200).json(token);
});

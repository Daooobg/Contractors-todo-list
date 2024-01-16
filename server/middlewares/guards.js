const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.restrictForAdmin = catchAsync(async (req, res, next) => {
    const user = req.user;

    if (user.role !== 'Admin' && user.role !== 'Owner') {
        return next(new AppError('Unauthorized', 401, req.body));
    }

    next();
});

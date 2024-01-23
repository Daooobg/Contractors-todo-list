const userService = require('../services/userService');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllContractors = catchAsync(async (req, res, next) => {
    const contractors = await userService.getAllContractors();
    res.status(200).json(contractors);
});

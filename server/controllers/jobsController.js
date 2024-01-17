const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const jobService = require('../services/jobsService');

exports.addAddress = catchAsync(async (req, res, next) => {
    const { postcode, fullAddress } = req.body;

    if (!postcode || !fullAddress) {
        return next(new AppError('All fields are required', 400, req.body));
    }

    await jobService.addAddress(req.body);

    res.status(204).end();
});

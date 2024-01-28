const imageService = require('../services/imageService');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.addAllImages = catchAsync(async (req, res, next) => {
    const issueId = req.params;
    const image = req.file;
    if (!image || issueId) {
        return next(new AppError('There is a problem please try again', 400));
    }

    const imageUrl = await imageService.addAllImages(issueId.id, image);
    res.status(200).json(imageUrl);
});

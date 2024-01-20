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

exports.getAddressByPostcode = catchAsync(async (req, res, next) => {
    const { postcode } = req.params;

    if (!postcode) {
        return next(new AppError('Please send postcode', 400, req.body));
    }

    const addresses = await jobService.getAddressByPostcode(postcode);

    res.status(200).json(addresses);
});

exports.addNewContact = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const newContact = req.body;

    if (!id) {
        return next(new AppError('Please send address id', 400));
    }

    if (!newContact) {
        return next(new AppError('Please send contact details', 400))
    }
    try {
        const contactId = await jobService.addNewContact(id, newContact);
        res.status(200).json(contactId);
        
    } catch (error) {
        return next(new AppError(error));
    }
});

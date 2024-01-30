const Address = require('../models/addressModel');
const Image = require('../models/imageModel');
const Issues = require('../models/issuesModel');
const AppError = require('../utils/AppError');

const findAddressById = (id) => Address.findById({ _id: id });

exports.addAddress = async (data) => {
    const address = await Address.create(data);

    return address;
};

exports.getAddressByPostcode = async (postcode) => {
    const addresses = await Address.find({ postcode: postcode }).select('-__v');

    return addresses;
};

exports.addNewContact = async (addressId, newContact) => {
    try {
        const address = await findAddressById(addressId);

        if (!address) {
            throw new AppError('Address not found');
        }

        address.contactDetails = address.contactDetails || [];

        address.contactDetails.push(newContact);
        const updatedAddress = await address.save();

        return updatedAddress.contactDetails[updatedAddress.contactDetails.length - 1]._id;
    } catch (error) {
        throw new AppError(error);
    }
};

exports.deleteContact = async (addressId, contactId) => {
    try {
        const address = await findAddressById(addressId);

        if (!address) {
            throw new AppError('Address not found');
        }

        address.contactDetails = address.contactDetails || [];
        address.contactDetails = address.contactDetails.filter((contact) => contact._id.toString() !== contactId);

        await address.save();

        return {
            message: 'Deleted successfully',
        };
    } catch (error) {
        throw new AppError(error);
    }
};

exports.editContact = async (addressId, contactDetails) => {
    try {
        const address = await findAddressById(addressId);

        if (!address) {
            throw new AppError('Address not found');
        }

        address.contactDetails = address.contactDetails || [];
        address.contactDetails = address.contactDetails.map((contact) => {
            if (contact._id.toString() === contactDetails._id) {
                contact.name = contactDetails.name;
                contact.phoneNumber = contactDetails.phoneNumber;
            }
            return contact;
        });

        await address.save();

        return {
            message: 'Updated successfully',
        };
    } catch (error) {
        throw new AppError(error);
    }
};

exports.createNewJob = async (data, owner) => {
    data.ownerId = owner._id;

    try {
        const newJob = await Issues.create(data);

        return newJob;
    } catch (error) {
        throw new AppError(error);
    }
};

exports.getAllJobsByOwnerId = (user, filter) =>
    Issues.find({ ownerId: user._id, ...filter }, '-issues.issueImageUrl')
        .populate([
            { path: 'addressId', select: 'postcode fullAddress  -_id' },
            { path: 'contractorId', select: 'fullName -_id' },
        ])
        .select('issues createdAt -ownerId -allImages -__v');

exports.getAllJobsByContractorId = (user, filter) =>
    Issues.find({ contractorId: user._id, ...filter }, '-issues.issueImageUrl')
        .populate([
            { path: 'addressId', select: 'postcode fullAddress  -_id' },
            { path: 'ownerId', select: 'fullName -_id' },
        ])
        .select('issues createdAt -ownerId -allImages -__v');

exports.getJobById = (jobId) =>
    Issues.findById({ _id: jobId })
        .populate([
            { path: 'allImages', select: '-__v' },
            { path: 'contractorId', select: 'fullName' },
            { path: 'addressId', select: '-__v' },
            { path: 'ownerId', select: 'fullName' },
            { path: 'issues.issueImageUrl', select: '-__v' },
        ])
        .select('-__v');

const Address = require('../models/addressModel');
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

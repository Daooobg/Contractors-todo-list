const Address = require('../models/addressModel');

exports.addAddress = async (data) => {
    const address = await Address.create(data);

    return address;
};

exports.getAddressByPostcode = async (postcode) => {
    const addresses = await Address.find({ postcode: postcode }).select('-__v');

    return addresses;
};

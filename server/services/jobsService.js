const Address = require('../models/addressModel');

exports.addAddress = async (data) => {
    const address = await Address.create(data);

    return address;
};

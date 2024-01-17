const { Schema, model } = require('mongoose');
const capitalizeEveryWord = require('../utils/capitalizeEveryWord');



const addressSchema = new Schema({
    postcode: {
        type: String,
        uppercase: true,
        required: [true, 'Please tell us the postcode.'],
    },
    fullAddress: {
        type: String,
        required: [true, 'Please tell us the rest of the address.'],
        set:capitalizeEveryWord
    },
    contactDetails: [{ name: { type: String }, phoneNumber: { type: String } }],
});

const Address = model('Address', addressSchema);

module.exports = Address;

const User = require('../models/userModel');

exports.getAllContractors = () => User.find({ role: 'Contractor', disabled: false, approved: true }).select('-approved -disabled -password -role -__v');

const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    imageUrl: {
        type: String,
    },
});

const Image = model('Image', imageSchema);
module.exports = Image;

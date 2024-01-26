const { Schema, model, default: mongoose } = require('mongoose');

const issuesSchema = new Schema({
    // Fields for each issue in an array
    issues: [
        {
            issue: {
                type: String,
                required: [true, 'Please send the issue'],
            },
            issueImageUrl: [
                {
                    url: {
                        type: String,
                    },
                },
            ],
            price: {
                type: Number,
                // required: [true, 'Please provide price'],
                min: [0, 'Price must be a positive number'],
            },
        },
    ],
    // Total price for all issues
    totalPrice: {
        type: Number,
        // required: [true, 'Please provide total price'],
        min: [0, 'Total price must be a positive number'],
    },
    // Array of images associated with the issue
    allImages: [
        {
            imageUrl: {
                type: String,
            },
        },
    ],
    // Creation timestamp
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    // Reference to the contractor (User model)
    contractorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    addressId: {
        type: mongoose.Types.ObjectId,
        ref: 'Address',
    },
    // Reference to the owner (User model)
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Issue = model('Issue', issuesSchema);
module.exports = Issue;

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
                    type: mongoose.Types.ObjectId,
                    ref: 'Image',
                },
            ],
            price: {
                type: Number,
                min: [0, 'Price must be a positive number'],
            },
        },
    ],
    // Total price for all issues
    totalPrice: {
        type: Number,
        min: [0, 'Total price must be a positive number'],
    },
    // Array of images associated with the issue
    allImages: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Image',
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
    // Job status
    status: {
        type: String,
        lowercase: true,
        enum: {
            values: ['created', 'approved', 'finnish'],
            message: 'Please select a correct status (Created, Approved, Finnish)',
        },
        default: 'created',
    },
    // Job progress
    progress: {
        type: String,
        lowercase: true,
        enum: {
            values: ['created', 'booked', 'in progress', 'finish'],
            message: 'Please select a correct status (Created, Booked, In progress, Finnish)',
        },
        default: 'created',
    },
    // Job payment status
    paymentStatus: {
        type: Boolean,
        default: false,
    },
});

const Issue = model('Issue', issuesSchema);
module.exports = Issue;

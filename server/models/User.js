const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 40,
        },
        lastName: {
            type: String,
            required: true,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        communities: [{
            type: Schema.Types.ObjectId,
            ref: 'Community'
        }],
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }
);

const User = model('User', userSchema);

module.exports = User;
const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        community: {
            type: Schema.Types.ObjectId,
            ref: 'Community'
        }
    }
);

const Product = model('Product', productSchema);

module.exports = Product;
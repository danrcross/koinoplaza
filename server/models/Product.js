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
        image: {
            type: String,
        },
        condition: {
            type: String
        },
        price: {
            type: Number,
            required: true,
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
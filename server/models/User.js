const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

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
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        communities: [{
            type: Schema.Types.ObjectId,
            ref: 'Community'
        }],
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
        watchlist: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
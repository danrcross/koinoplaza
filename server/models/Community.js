const { Schema, model } = require('mongoose');

const communitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            max: 200
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
          virtuals: true
        },
        id: false,
    }
);

// virtual that would return all of the products for a community
communitySchema.virtual('allCommunityProducts').get(function() {
    return this.users.map((user) => user.products);
});

communitySchema.virtual('numberOfMembers').get(function() {
    return this.users.length;
});

const Community = model('Community', communitySchema);

module.exports = Community;
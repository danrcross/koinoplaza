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
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
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

const Community = model('Community', communitySchema);

module.exports = Community;
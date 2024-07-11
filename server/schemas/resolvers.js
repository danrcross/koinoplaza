const { Community, User, Product } = require('../models');

const resolvers = {
    Query: {
        communities: async () => {
            return await Community.find({});
        },
        community: async (parent, { communityID }) => {
            return await Community.findOne({ _id: communityID })
        },
        users: async () => {
            return await User.find({});
        },
        user: async (parent, { userID }) => {
            return await User.findOne({ _id: userID })
        },
        products: async () => {
            return await Product.find({});
        },
        product: async (parent, { productID }) => {
            return await Product.findOne({ _id: productID })
        },
    },

    Mutation: {
        addCommunity: async (parent, { info }) => {
            return Community.create({ info })
        },
        addUser: async (parent, { info }) => {
            return User.create({ info })
        },
        addProduct: async (parent, { info }) => {
            return Product.create({ info })
        }
    }
};

module.exports = resolvers;
const { Community, User, Product } = require("../models");

const resolvers = {
  Query: {
    communities: async () => {
      return await Community.find({});
    },
    community: async (parent, { communityID }) => {
      return await Community.findOne({ _id: communityID });
    },
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { userID }) => {
      return await User.findOne({ _id: userID });
    },
    products: async () => {
      return await Product.find({});
    },
    product: async (parent, { productID }) => {
      return await Product.findOne({ _id: productID });
    },
  },

  Mutation: {
    // create a new community
    addCommunity: async (parent, args) => {
      return await Community.create(args).then((result) => console.log(result));
    },

    // create a new user
    addUser: async (parent, args) => {
      return await User.create(args);
    },

    // Create a new product. This will take the user's input for name/desc/price, as well desired community
    // first it creates a new Product, then adds that product ID to the Community and the User
    addProduct: async (parent, args) => {
      const { name, description, price, userID, communityID } = args;
      // creates the new product
      const newProduct = new Product({ name, description, price });
      await newProduct.save();
      // saves that new product's ID to be used for updating database
      const newProductID = newProduct._id;
      await Product.findOneAndUpdate(
        { _id: newProductID },
        { $addToSet: { createdBy: userID, community: communityID } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: userID },
        { $addToSet: { products: newProductID } },
        { new: true }
      );
      await Community.findOneAndUpdate(
        { _id: communityID },
        { $addToSet: { products: newProductID } },
        { new: true }
      );
      return;
    },

    // Remove a product from user's array first, then remove the occurence
    removeProduct: async (parent, { productID }) => {
      await User.findOneAndUpdate(
        { products: productID },
        { $pull: { products: productID } }
      );
      return await Product.findOneAndDelete({ _id: productID });
    },

    joinCommunity: async (parent, { userID, communityID }) => {
      await Community.findOneAndUpdate(
        { _id: communityID },
        { $addToSet: { users: userID } }
      );
      return await User.findOneAndUpdate(
        { _id: userID },
        { $addToSet: { communities: communityID } },
        { new: true }
      );
    },

    leaveCommunity: async (parent, { userID, communityID }) => {
      await Community.findOneAndUpdate(
        { _id: communityID },
        { $pull: { users: userID } }
      );
      return await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { communities: communityID } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

const { Community, User, Product } = require("../models");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const { signToken, AuthenticationError } = require("../utils/auth");

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
      return await Product.findOneById({ _id: productID });
    },
    currentUser: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      return await User.findById(context.user._id);
    },
    getUserProducts: async (parent, { userID }) => {
      const user = await User.findById(userID).populate("products");
      return user.products;
    },
    getUserCommunities: async (parent, { userID }) => {
      const user = await User.findById(userID).populate("communities");
      return user.communities;
    },
    getOtherCommunities: async () => {
      return await Community.find({});
    },
    getUserWatchlist: async (parent, { userID }) => {
      const user = await User.findById(userID).populate("watchlist");
      return user.watchlist;
    },
  },

  Mutation: {
    // create a new community
    addCommunity: async (parent, args) => {
      const {
        name,
        description,
        location,
        image,
        createdBy,
      } = args;
      // creates the new product
      const newCommunity = new Community({
        name,
        description,
        location,
        image,
        createdBy
      });
      await newCommunity.save();
      
      // Now, update the user to join that community
      const newCommunityID = newCommunity._id;
      await User.findOneAndUpdate(
        { _id: createdBy },
        { $addToSet: { communities: newCommunityID } },
        { new: true }
      );
      return newCommunity;
    },

    // create a new user
    addUser: async (parent, args) => {
      const newUser = await User.create(args);
      const token = signToken(newUser);
      return { token, newUser };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const passwordCheck = await user.isCorrectPassword(password);

      if (!passwordCheck) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },

    // Create a new product. This will take the user's input for name/desc/price, as well desired community
    // first it creates a new Product, then adds that product ID to the Community and the User
    addProduct: async (parent, args) => {
      const {
        name,
        description,
        image,
        price,
        condition,
        userID,
        communityID,
      } = args;
      // creates the new product
      const newProduct = new Product({
        name,
        description,
        image,
        price,
        condition,
      });
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
      // JP - temporarily comment out. Communities don't currently list products directly
      // await Community.findOneAndUpdate(
      //     { _id: communityID },
      //     { $addToSet: { products: newProductID } },
      //     { new: true }
      // );
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

    watchProduct: async (parent, { productID, userID }) => {
      return await User.findOneAndUpdate(
        { _id: userID },
        { $addToSet: { watchlist: productID } },
        { new: true }
      );
    },

    unwatchProduct: async (parent, { productID, userID }) => {
      return await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { watchlist: productID } },
        { new: true }
      );
    },

    // Add a user to a community
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

    // Remove a user from a community
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

    createCheckoutSession: async (parent, { productID }, context) => {
      const testProdId = "6696ded023b33cb0a29365c6";

      if (!context.user) {
        throw AuthenticationError;
      }

      const product = await Product.findById(testProdId);
      // const product = await Product.findById(productID);

      console.log(product);
      if (!product) {
        throw new Error("Product not found");
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: product.price * 100, // price in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });

      return { id: session.id };
    },
    updateUser: async (
      parent,
      { id, firstName, lastName, location, occupation, imageLink },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }

      return await User.findByIdAndUpdate(
        id,
        { firstName, lastName, location, occupation, imageLink },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

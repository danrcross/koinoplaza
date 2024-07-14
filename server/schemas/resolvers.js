const { Community, User, Product } = require('../models');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
        },
        createCheckoutSession: async (parent, { productId }) => {
            const product = await Product.findById(productId);
            // const url = new URL(context.headers.referer).origin;

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: product.name,
                                description: product.description,
                            },
                            unit_amount: product.price * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`,

                // success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                // cancel_url: `${url}/`,
            });

            return { id: session.Id };
        }
    }

};

module.exports = resolvers;
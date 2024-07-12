const connection = require('../config/connection');
const { Community, User, Product } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log("connection established");

    // If the following collections exist, drop them
    let communityCheck = await connection.db.listCollections({ name: 'communities' }).toArray();
    if (communityCheck.length) {
        await connection.dropCollection('communities');
    };

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    };

    let productCheck = await connection.db.listCollections({ name: 'products' }).toArray();
    if (productCheck.length) {
        await connection.dropCollection('products');
    };

    const communities = [
        {
            name: "Cool Community",
            description: "This is an example community",
            location: "Cheeseville, WI",
            users: []
        },
    ]

    const users = [
        {
            firstName: "Jimmy",
            lastName: "John",
            email: "email@email.com",
            communities: [],
            products: []
        },
        {
            firstName: "Yoshinao",
            lastName: "Onaga",
            email: "email2@email.com",
            communities: [],
            products: []
        }
    ]

    const products = [
        {
            name: "product1",
            description: "this is product 1",
            price: 50,
            createdBy: [],
            community: []
        },
        {
            name: "product2",
            description: "this is product 2",
            price: 25,
            createdBy: [],
            community: []
        },
        {
            name: "product3",
            description: "this is product 3",
            price: 88,
            createdBy: [],
            community: []
        },
        {
            name: "product4",
            description: "this is product 4",
            price: 12,
            createdBy: [],
            community: []
        },
        {
            name: "product5",
            description: "this is product 5",
            price: 500,
            createdBy: [],
            community: []
        }
    ]

    await Community.collection.insertMany(communities);
    await User.collection.insertMany(users);
    await Product.collection.insertMany(products);

    console.table(communities);
    console.table(users);
    console.table(products);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})

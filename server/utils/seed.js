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
            description: "This is a seeded community",
            location: "Cheeseville, WI",
            users: []
        },
        {
            name: "Community 2",
            description: "This is a second seeded community!",
            location: "New Orleans, LA",
            users: []
        }
    ]

    const users = [
        {
            firstName: "Jimmy",
            lastName: "John",
            email: "email@email.com",
            password: "password",   
            communities: [],
            products: []
        },
        {
            firstName: "Yoshinao",
            lastName: "Onaga",
            email: "email2@email.com",
            password: "password2",
            communities: [],
            products: []
        },
        {
            firstName: "Jen",
            lastName: "Giang",
            email: "email3@email.com",
            password: "password3",
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

    // Attempt 1 of adding all products to users/communities, users to communities
    const allCommunities = await Community.find({});
    let allCommunityIDs = [];
    allCommunityIDs.push(allCommunities.map((community) => community._id))

    const allUsers = await User.find({});
    let allUserIDs = [];
    allUserIDs.push(allUsers.map((user) => user._id));

    const allProducts = await Product.find({});
    let allProductIDs = [];
    allProductIDs.push(allProducts.map((product) => product._id));

    const populateCommunities = async () => {
        await Community.findOneAndUpdate(
            { _id: allCommunityIDs[0] },
            { $addToSet: { users: [allUserIDs[0], allUserIDs[2]] } },
        );
        await Community.findOneAndUpdate(
            { _id: allCommunityIDs[1] },
            { $addToSet: { users: allUserIDs[1] } }
        );
        await User.findOneAndUpdate(
            { _id: allUserIDs[0] },
            { $addToSet: { communities: allCommunityIDs[0] } }
        );
        await User.findOneAndUpdate(
            { _id: allUserIDs[1] },
            { $addToSet: { communities: allCommunityIDs[1] } }
        );
        await User.findOneAndUpdate(
            { _id: allUserIDs[2] },
            { $addToSet: { communities: allCommunityIDs[0] } }
        );
    }

    const populateProducts = async () => {
        await User.findOneAndUpdate(
            { _id: allUserIDs[0] },
            { $addToSet: { products: allProductIDs[0] } }
        );
        await User.findOneAndUpdate(
            { _id: allUserIDs[1] },
            { $addToSet: { products: [allProductIDs[3], allProductIDs[4]] } }
        );
        await User.findOneAndUpdate(
            { _id: allUserIDs[2] },
            { $addToSet: { products:[allProductIDs[1], allProductIDs[2]] } }
        );
        await Product.findOneAndUpdate(
            { _id:allProductIDs[0] },
            { $addToSet: { createdBy: allUserIDs[0] } },
            { $addToSet: { community: allCommunityIDs[0] } }
        );
        await Product.findOneAndUpdate(
            { _id:allProductIDs[1] },
            { $addToSet: { createdBy: allUserIDs[1] } },
            { $addToSet: { community: allCommunityIDs[0] } }
        );
        await Product.findOneAndUpdate(
            { _id:allProductIDs[2] },
            { $addToSet: { createdBy: allUserIDs[1] } },
            { $addToSet: { community: allCommunityIDs[0] } }
        );
        await Product.findOneAndUpdate(
            { _id:allProductIDs[3] },
            { $addToSet: { createdBy: allUserIDs[2] } },
            { $addToSet: { community: allCommunityIDs[1] } }
        );
        await Product.findOneAndUpdate(
            { _id:allProductIDs[4] },
            { $addToSet: { createdBy: allUserIDs[2] } },
            { $addToSet: { community: allCommunityIDs[1] } }
        );
    }

    console.log("all Community IDs - \n" + allCommunityIDs);
    console.log("\n all User IDs - \n" + allUserIDs);
    console.log("\n all Product IDs - \n" + allProductIDs);

    populateCommunities();
    populateProducts();


    console.table(communities);
    console.table(users);
    console.table(products);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})

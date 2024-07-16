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
            name: "Farming and Gardening Lovers",
            description: "A hub for any all who are into the world of growing your own food, crops, and livestock",
            location: "Cheeseville, WI",
            image: "https://www.hashmicro.com/blog/wp-content/uploads/2022/09/Gautam-Adani-IRMA-Speech.jpg",
            users: [],
            createdBy: ""
        },
        {
            name: "Atlanta Artists",
            description: "A welcome space for artists of all kinds!",
            location: "Atlanta, GA",
            image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/atlanta-ga-the-glow-atlanta-sunset-skyline-cityscape-art-reid-callaway.jpg",
            users: [],
            createdBy: ""
        }
    ]

    const users = [
        {
            firstName: "Jimmy",
            lastName: "John",
            email: "email@email.com",
            password: "password",
            image: "https://i.guim.co.uk/img/media/ac3a7be3d4cdc0b7ed07b2eeb41c03df9e1887c6/0_1952_5333_3200/master/5333.jpg?width=1900&dpr=1&s=none",
            occupation: "Deli Worker",
            rating: [5, 4],
            communities: [],
            products: [],
            watchlist: []
        },
        {
            firstName: "Yoshinao",
            lastName: "Onaga",
            email: "email2@email.com",
            password: "password2",
            image: "https://japaneserap.com/wp-content/uploads/2021/11/shouni.jpg",
            occupation: "Veterinarian",
            rating: [5, 5, 4],
            communities: [],
            products: [],
            watchlist: []
        },
        {
            firstName: "Jen",
            lastName: "Giang",
            email: "email3@email.com",
            password: "password3",
            image: "https://pbs.twimg.com/media/Er7CP11XAAANI_J.jpg:medium",
            occupation: "Farmer",
            rating: [5],
            communities: [],
            products: [],
            watchlist: []
        }
    ]

    const products = [
        {
            name: "Billy Goat",
            description: "This here is the finest goat in all the lands. Has served me well.",
            image: "https://www.agriculture.com/thmb/0tzXdEDXMBY0Ty8QMkNIOj2pqM4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/102328113-2000-ddf1426d4d8741129c1eb12e905a10f3.jpg",
            condition: "1 year old",
            price: 51,
            createdBy: [],
            community: []
        },
        {
            name: "Cabbage (1 head)",
            description: "Straight from my farm, I have plenty of cabbage in bulk!",
            price: 2,
            image: "https://assets.clevelandclinic.org/transform/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg",
            condition: "Fresh",
            createdBy: [],
            community: []
        },
        {
            name: "Laying Chicken",
            description: "I have so many chickens. Looking to give ol' Patty (her name) a good home.",
            price: 30,
            image: "https://www.somerzby.com.au/wp-content/uploads/2021/06/Rhode-Island-Red-Chickens.png",
            condition: "1.5 years old",
            createdBy: [],
            community: []
        },
        {
            name: "Oil Painting",
            description: "Inspired by the whimsical flora in my garden, this hand painted piece measures 24x36 inches and is sure to brighten any space.",
            price: 85,
            image: "https://m.media-amazon.com/images/I/81+xlitC-NL._AC_UF894,1000_QL80_.jpg",
            condition: "new",
            createdBy: [],
            community: []
        },
        {
            name: "Veiled Marble Sculpture",
            description: "Hand sculpted by me, measures 24 inches high. A high-class piece for any home. Can also have staring contests with it if you want.",
            price: 760,
            image: "https://www.marble-sculpture.com/cdn/shop/files/4BEA2FDC-1BAE-4C49-9456-C0DD72C28808.png?v=1713261197",
            condition: "new",
            createdBy: [],
            community: []
        }
    ]

    await Community.collection.insertMany(communities);
    await User.collection.insertMany(users);
    await Product.collection.insertMany(products);

    // Get all the Communities, Users, and Products we just created
    const allCommunities = await Community.find({});
    const allUsers = await User.find({});
    const allProducts = await Product.find({});

    // Populate Users into Communities, and Communities into Users
    const populateCommunities = async () => {
        try {
            await Community.findByIdAndUpdate(
                allCommunities[0]._id,
                {
                    $addToSet: {
                        users: [allUsers[0]._id, allUsers[2]._id]
                    },
                    createdBy: allUsers[0]._id
                },
            );
            await Community.findByIdAndUpdate(
                allCommunities[1]._id,
                {
                    $addToSet: {
                        users: allUsers[1]._id
                    },
                    createdBy: allUsers[1]._id
                },
            );
            await User.findByIdAndUpdate(
                allUsers[0]._id,
                { $addToSet: { communities: allCommunities[0]._id } }
            );
            await User.findByIdAndUpdate(
                allUsers[1]._id,
                { $addToSet: { communities: allCommunities[1]._id } }
            );
            await User.findByIdAndUpdate(
                allUsers[2]._id,
                { $addToSet: { communities: allCommunities[0]._id } }
            );
            console.log("\n Communities+Users Updated! \n");
        } catch (err) {
            console.error(err);
        };
    };

    // Populate Products into Users, and Users/Communities into Products
    const populateProducts = async () => {
        try {
            await User.findByIdAndUpdate(
                allUsers[0]._id,
                { $addToSet: { products: allProducts[0]._id } }
            );
            await User.findByIdAndUpdate(
                allUsers[1]._id,
                { $addToSet: { products: [allProducts[3]._id, allProducts[4]._id] } }
            );
            await User.findByIdAndUpdate(
                allUsers[2]._id,
                { $addToSet: { products: [allProducts[1]._id, allProducts[2]._id] } }
            );
            await Product.findByIdAndUpdate(
                allProducts[0]._id,
                {
                    $addToSet: {
                        createdBy: allUsers[0]._id,
                        community: allCommunities[0]._id
                    }
                },
            );
            await Product.findByIdAndUpdate(
                allProducts[1]._id,
                {
                    $addToSet: {
                        createdBy: allUsers[2]._id,
                        community: allCommunities[0]._id
                    }
                },
            );
            await Product.findByIdAndUpdate(
                allProducts[2]._id,
                {
                    $addToSet: {
                        createdBy: allUsers[2]._id,
                        community: allCommunities[0]._id
                    }
                },
            );
            await Product.findByIdAndUpdate(
                allProducts[3]._id,
                {
                    $addToSet: {
                        createdBy: allUsers[1]._id,
                        community: allCommunities[1]._id
                    }
                },
            );
            await Product.findByIdAndUpdate(
                allProducts[4]._id,
                {
                    $addToSet: {
                        createdBy: allUsers[1]._id,
                        community: allCommunities[1]._id
                    }
                },
            );
            console.log("\n Products+Users Updated! \n")
        } catch (err) {
            console.error(err);
        };
    };

    // Run the above functions
    await populateCommunities();
    await populateProducts();

    console.table(communities);
    console.table(users);
    console.table(products);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});


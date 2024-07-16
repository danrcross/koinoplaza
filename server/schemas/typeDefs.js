const typeDefs = `
type Community {
    _id: ID
    name: String
    description: String
    location: String
    image: String
    users: [ID]
    createdBy: ID
}

type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    image: String
    occupation: String
    rating: [Float]
    communities: [ID]
    products: [ID]
    watchlist: [ID]
}

type Product {
    _id: ID
    name: String
    description: String
    image: String
    condition: String
    price: Float
    createdBy: ID
    community: ID
}

type CheckoutSession {
    id: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    communities: [Community]
    community(communityID: ID!): Community
    users: [User]
    user(userID: ID!): User
    products: [Product]
    product(productID: ID!): Product
    currentUser: User
    getUserProducts(userID: ID!): [Product]  
    getUserCommunities(userID: ID!): [Community]  
    getOtherCommunities: [Community]
    getUserWatchlist(userID: ID!): [Product]  
}

type Mutation {
    addCommunity(name: String!, description: String!, location: String!, image: String, createdBy: ID!): Community
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, image: String, occupation: String): Auth
    login(email: String!, password: String!): Auth
    addProduct(name: String!, description: String!, condition: String, image: String, price: Float!, userID: ID!, communityID: ID!): Product
    removeProduct(productID: ID!): Product
    watchProduct(productID: ID!, userID: ID!): User
    unwatchProduct(productID: ID!, userID: ID!): User
    joinCommunity(userID: ID!, communityID: ID!): User
    leaveCommunity(userID: ID!, communityID: ID!): User
    createCheckoutSession(productId: ID!): CheckoutSession
    
}
`;

module.exports = typeDefs;
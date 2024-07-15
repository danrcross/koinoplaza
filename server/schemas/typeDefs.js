const typeDefs = `
type Community {
    _id: ID
    name: String
    description: String
    location: String
    users: [ID]
}

type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    communities: [ID]
    products: [ID]
    watchlist: [ID]
}

type Product {
    _id: ID
    name: String
    description: String
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
}

type Mutation {
    addCommunity(name: String!, description: String!, location: String!): Community
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProduct(name: String!, description: String!, price: Float!, userID: ID!, communityID: ID!): Product
    removeProduct(productID: ID!): Product
    watchProduct(productID: ID!, userID: ID!): User
    unwatchProduct(productID: ID!, userID: ID!): User
    joinCommunity(userID: ID!, communityID: ID!): User
    leaveCommunity(userID: ID!, communityID: ID!): User
    createCheckoutSession(productId: ID!): CheckoutSession
    
}
`;

module.exports = typeDefs;
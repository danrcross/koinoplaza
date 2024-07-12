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
    communities: [ID]
    products: [ID]
}

type Product {
    _id: ID
    name: String
    description: String
    price: Float
    createdBy: ID
    community: ID
}

type Query {
    communities: [Community]
    community(communityID: ID!): Community
    users: [User]
    user(userID: ID!): User
    products: [Product]
    product(productID: ID!): Product
}

type Mutation {
    addCommunity(name: String!, description: String!, location: String!): Community
    addUser(firstName: String!, lastName: String!, email: String!): User
    addProduct(name: String!, description: String!, price: Float!, userID: ID!, communityID: ID!): Product
    removeProduct(productID: ID!): Product
    joinCommunity(userID: ID!, communityID: ID!): User
    leaveCommunity(userID: ID!, communityID: ID!): User
}
`;

module.exports = typeDefs;
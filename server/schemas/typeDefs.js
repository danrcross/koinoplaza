const typeDefs = `
type Community {
    _id: ID
    name: String
    description: String
    location: String
    
}

type User {
    _id: ID
    firstName: String
    lastName: String
    email: String

}

type Product {
    _id: ID
    name: String
    description: String
    price: Float
    
}

type CheckoutSession {
    id: String
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
    addProduct(name: String!, description: String!, price: Float): Product
    createCheckoutSession(productId: ID!): CheckoutSession
}
`;

module.exports = typeDefs;
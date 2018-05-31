export default [`
    
    type User {
        _id: String
        username: String
    }
    
    type Query {
        allUsers: [User]
    }
    
    type Mutation {
        deleteUser(_id: String!): User!
        createUser(username: String!): User!
        updateUser(_id: String!, username: String!): User!
    }
`];
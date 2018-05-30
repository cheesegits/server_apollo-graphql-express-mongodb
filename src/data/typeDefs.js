export default [`
    
    type Player {
        _id: String
        username: String
    }
    
    type Query {
        allPlayers: [Player]
    }
    
    type Mutation {
        deletePlayer(_id: String!): Player!
        createPlayer(username: String!): Player!
        updatePlayer(_id: String!, username: String!): Player!
    }
`];
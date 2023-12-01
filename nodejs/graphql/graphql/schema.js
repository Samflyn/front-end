const { buildSchema } = require('graphql');

// ! means required
// schema -> all queries
// type -> a query which is defined in resolver
// input is used for data which is used as an argument
// no date in graphql
module.exports = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData!
    }

    type Thing {
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        things: [Thing]
    }

    input UserData {
        name: String!
        email: String!
    }

    type RootMutation {
        createData(userData: UserData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const authors = [
  {
    id: '3d594650-3436-11e9-bc57-8b80ba24c432',
    name: 'Test 1',
    born: 9999,
    books: 1
  },
  {
    id: '3d594650-3436-11e9-bc27-8b50ba24c432',
    name: 'Test 2',
    born: 9991,
    books: 2
  }
];

const typeDefs = /*Graphql */ `
    type Author {
    id: ID!    
    name: String!
    born: Int
    books: Int
    }

    type Query {
    allAuthors: [Author!]
    }
`;

const resolvers = {
  Query: {
    allAuthors: () => authors
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

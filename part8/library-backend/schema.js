const typeDefs = /* GraphQL */ `
  type Author {
    id: ID!
    name: String!
    born: Int
    books: Int
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    published: Int!
    author: Author!
  }

  type Query {
    allAuthors: [Author!]
    allBooks: [Book!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      author: String!
    ): Book
    editBorn(name: String!, born: Int!): Author
  }
`;

module.exports = typeDefs;

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
    published: Int!
    author: Author!
  }

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allAuthors: [Author!]
    allBooks: [Book!]!
    bookCount: Int!
    findAuthor(name: String!): Author!
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!): Book!
    editBorn(name: String!, born: Int!): Author
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
`;

module.exports = typeDefs;

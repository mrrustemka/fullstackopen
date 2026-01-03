const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');

let authors = [
  {
    id: 'a1',
    name: 'Robert Martin',
    born: 1952,
    books: 3
  },
  {
    id: 'a2',
    name: 'Martin Fowler',
    born: 1963,
    books: 3
  },
  {
    id: 'a3',
    name: 'Kent Beck',
    born: 1961,
    books: 2
  },
  {
    id: 'a4',
    name: 'Eric Evans',
    born: 1965,
    books: 2
  },
  {
    id: 'a5',
    name: 'Brian Kernighan',
    born: 1942,
    books: 2
  },
  {
    id: 'a6',
    name: 'Douglas Crockford',
    born: 1949,
    books: 2
  },
  {
    id: 'a7',
    name: 'Steve McConnell',
    born: 1962,
    books: 2
  },
  {
    id: 'a8',
    name: 'Andrew Hunt',
    born: 1964,
    books: 2
  },
  {
    id: 'a9',
    name: 'David Thomas',
    born: 1956,
    books: 1
  },
  {
    id: 'a10',
    name: 'Donald Knuth',
    born: 1938,
    books: 1
  }
];

let books = [
  // Robert Martin (3)
  { id: 'b1', author: 'Robert Martin', title: 'Clean Code', published: 2008 },
  {
    id: 'b2',
    author: 'Robert Martin',
    title: 'Clean Architecture',
    published: 2017
  },
  {
    id: 'b3',
    author: 'Robert Martin',
    title: 'The Clean Coder',
    published: 2011
  },

  // Martin Fowler (3)
  { id: 'b4', author: 'Martin Fowler', title: 'Refactoring', published: 1999 },
  {
    id: 'b5',
    author: 'Martin Fowler',
    title: 'Patterns of Enterprise Application Architecture',
    published: 2002
  },
  {
    id: 'b6',
    author: 'Martin Fowler',
    title: 'Domain-Specific Languages',
    published: 2010
  },

  // Kent Beck (2)
  {
    id: 'b7',
    author: 'Kent Beck',
    title: 'Test-Driven Development: By Example',
    published: 2003
  },
  {
    id: 'b8',
    author: 'Kent Beck',
    title: 'Extreme Programming Explained',
    published: 1999
  },

  // Eric Evans (2)
  {
    id: 'b9',
    author: 'Eric Evans',
    title: 'Domain-Driven Design',
    published: 2003
  },
  {
    id: 'b10',
    author: 'Eric Evans',
    title: 'Domain-Driven Design Reference',
    published: 2014
  },

  // Brian Kernighan (2)
  {
    id: 'b11',
    author: 'Brian Kernighan',
    title: 'The C Programming Language',
    published: 1978
  },
  {
    id: 'b12',
    author: 'Brian Kernighan',
    title: 'The Practice of Programming',
    published: 1999
  },

  // Douglas Crockford (2)
  {
    id: 'b13',
    author: 'Douglas Crockford',
    title: 'JavaScript: The Good Parts',
    published: 2008
  },
  {
    id: 'b14',
    author: 'Douglas Crockford',
    title: 'How JavaScript Works',
    published: 2018
  },

  // Steve McConnell (2)
  {
    id: 'b15',
    author: 'Steve McConnell',
    title: 'Code Complete',
    published: 1993
  },
  {
    id: 'b16',
    author: 'Steve McConnell',
    title: 'Software Estimation',
    published: 2006
  },

  // Andrew Hunt & David Thomas (Pragmatic Programmer)
  {
    id: 'b17',
    author: 'Andrew Hunt',
    title: 'The Pragmatic Programmer',
    published: 1999
  },
  {
    id: 'b18',
    author: 'Andrew Hunt',
    title: 'Pragmatic Thinking and Learning',
    published: 2008
  },

  // David Thomas (1)
  {
    id: 'b19',
    author: 'David Thomas',
    title: 'Programming Ruby',
    published: 2000
  },

  // Donald Knuth (1)
  {
    id: 'b20',
    author: 'Donald Knuth',
    title: 'The Art of Computer Programming',
    published: 1968
  }
];

const typeDefs = /*Graphql */ `
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
    }

    type Query {
    allAuthors: [Author!]
    allBooks: [Book!]
    }

    type Mutation {
    addBook (
    title: String!
    author: String!
    published: Int!
    ): Book
    editBorn (
    name: String!
    born: Int!
    ): Author
    }
`;

const resolvers = {
  Query: {
    allAuthors: () => authors,
    allBooks: () => books
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find((b) => b.title === args.title)) {
        throw new Error('Title must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        });
      }

      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },
    editBorn: (root, args) => {
      const author = authors.find((a) => a.name === args.name);

      if (!author) return null;
      console.log(author);

      const updatedAuthor = { ...author, born: args.born };
      authors = authors.map((a) =>
        a.name === args.name ? { ...a, born: args.born } : a
      );
      return updatedAuthor;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

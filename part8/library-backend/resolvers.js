const Author = require('./models/author');
const Book = require('./models/book');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const resolvers = {
  Query: {
    allAuthors: async () => {
      return await Author.find({});
    },
    allBooks: async () => {
      return await Book.find({});
    },
    bookCount: async () => {
      return (await Book.find({})).length;
    },
    findAuthor: async (root, args) => Author.findOne({ name: args.name })
  },
  Mutation: {
    addBook: (root, args) => {
      // if (books.find((b) => b.title === args.title)) {
      //   throw new Error('Title must be unique', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT',
      //       invalidArgs: args.title
      //     }
      //   });
      // }
      // const book = { ...args, id: uuid() };
      // books = books.concat(book);
      // return book;
    },
    editBorn: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      author.born = args.born;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError(`Saving number failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  }
};

module.exports = resolvers;

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
      return await Book.find({}).populate('author');
    },
    bookCount: async () => {
      return (await Book.find({})).length;
    },
    findAuthor: async (root, args) => Author.findOne({ name: args.name })
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id
      });

      await book.save();

      return book.populate('author');
    },

    editBorn: async (root, args) => {
      console.log('ARGS:', args);
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

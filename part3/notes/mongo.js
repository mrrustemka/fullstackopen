const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const username = process.argv[3];

const url = `mongodb+srv://${username}:${password}@cluster0.raw77ka.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

// const note = new Note({
//   content: 'Mongoose makes things easy',
//   important: false
// });

// note.save().then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean
// });

// const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'HTML is easy',
//   important: false
// });

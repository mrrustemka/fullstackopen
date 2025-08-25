// const mongoose = require('mongoose');

// if (process.argv.length < 4) {
//   console.log('give password and username as arguments');
//   process.exit(1);
// }

// const password = process.argv[2];
// const username = process.argv[3];

// const url = `mongodb+srv://${username}:${password}@cluster0.raw77ka.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.set('strictQuery', false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     minLength: 5,
//     required: true
//   },
//   important: Boolean
// });

// const Note = mongoose.model('Note', noteSchema);

// application.get('/api/notes', (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

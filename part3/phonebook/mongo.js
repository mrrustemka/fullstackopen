const mongoose = require('mongoose')

if (process.argv.length < 4) {
  console.log('Give password as argument')
  process.exit(1)
}

const name = process.argv[4]
const number = process.argv[5]

const url = process.env.DB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tls: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 4) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

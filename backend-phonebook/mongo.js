const mongoose = require("mongoose");

if (
  process.argv.length < 3 ||
  (process.argv.length > 3 && process.argv.length < 5)
) {
  console.log("provide password and person data as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://mateuszkuruc:${password}@cluster0.xuvl4j3.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name,
  number,
});

process.argv.length > 3
  ? person.save().then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
  : Person.find({}).then((persons) => {
      console.log(`phonebook:`);
      persons.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    });

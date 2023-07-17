const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2]

const url = `mongodb+srv://mateuszkuruc:${password}@cluster0.xuvl4j3.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'HTML is easy',
    important: true
})

const note3 = new Note({
    content: 'CSS is hard',
    important: true
})

const note2 = new Note({
    content: 'Mongoose makes things easy',
    important: true
})

note.save().then(result => {
    console.log('note saved!');
    mongoose.connection.close();
})


note2.save().then(result => {
    console.log('note saved!');
    mongoose.connection.close();
})

note3.save().then(result => {
    console.log('note saved!');
    mongoose.connection.close();
})
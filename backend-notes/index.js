const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const dotenv = require('dotenv');
dotenv.config();
// morgan.token('body', req => JSON.stringify(req.body))
// app.use(morgan("tiny"));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Note = require('./models/note');

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
});

console.log(new Date().toString());

app.get("/info", (request, response) => {
  const infoMessage = `Phonebook has info for ${notes.length} people`;
  const timeInfo = new Date().toString();
  response.send(`<p>${infoMessage}</p><p>${timeInfo}</p>`);
});

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
    response.json(note)
  } else {
    response.status(404).end();
  }
  })
  .catch(error => {
    next(error)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

// const generateId = () => {
//   const id = Math.floor(Math.random() * 999999 + 1);
//   return id;
// };

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})


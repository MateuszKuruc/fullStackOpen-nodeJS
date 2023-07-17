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

// let notes = [
//     {
//       "id": 1,
//       "content": "HTML is easy",
//       "important": true
//     },
//     {
//       "id": 2,
//       "content": "Browser can execute only JavaScript",
//       "important": true
//     },
//     {
//       "id": 3,
//       "content": "GET and POST are the most important methods of HTTP protocol",
//       "important": false
//     },
//     {
//       "content": "mati",
//       "important": false,
//       "id": 4
//     }
//   ]



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

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const id = Math.floor(Math.random() * 999999 + 1);
  return id;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content || !body.important) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  if (notes.some((note) => note.content === body.content)) {
    return response.status(400).json({
      error: `${body.content} already exists`,
    });
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important,
  };

  notes = notes.concat(note);
  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})


const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

const Person = require("./models/person");
const person = require("./models/person");

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1");
});

app.get('/info', (request, response, error) => {
    Person.find({}).then(persons => {
        response.send(`<p>${new Date().toString()}</p><p>Phonebook has info for ${persons.length} people`);
    })
    .catch(error => next(error))
})

app.get("/api/persons", (request, response, error) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  })
  .catch(error => next(error))
});

app.get('/api/persons/:id', (request, response, error) => {
    const body = request.body;

    Person.findById(request.params.id)
    .then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  console.log("request body", request.body);

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  })
  .catch(error => next(error))
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
    console.log(request.body);
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then((updatedPerson) => {
    response.json(updatedPerson);
  }).catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if ((error.name = "CastError")) {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

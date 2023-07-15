const express = require("express");
const app = express();



const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

console.log(new Date().toString());

app.get('/info', (request, response) => {
    const infoMessage = `Phonebook has info for ${persons.length} people`;
    const timeInfo = new Date().toString();
    response.send(`<p>${infoMessage}</p><p>${timeInfo}</p>`)
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

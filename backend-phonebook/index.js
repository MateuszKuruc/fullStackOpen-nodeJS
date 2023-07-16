const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let persons = [
      {
        "name": "mati",
        "number": "888",
        "id": 1
      },
      {
        "name": "Puszkinson Crusoe",
        "number": "666",
        "id": 2
      },
      {
        "name": "rabarbar",
        "number": "777",
        "id": 3
      }
    ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1');
});

app.get('/api/persons', (request, response) => {
    response.json(persons)
})



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
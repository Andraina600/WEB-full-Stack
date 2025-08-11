const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 8080;


app.use(cors());
app.use(express.json());


let data = JSON.parse(fs.readFileSync('./characters.json', 'utf-8'));

app.get('/characters', (req, res) => {
    res.json(data.characters);
});

app.get('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const character = data.characters.find((char) => char.id === id);

    if(character){
      res.json(character)
    }
    else{
      res.status(404).send('Character not found');
    }

});

app.put('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.characters.findIndex((char) => char.id === id);
  if (index === -1) return res.status(404).send('Character not found');

  data.characters[index] = { id, ...req.body };
  fs.writeFileSync('./characters.json', JSON.stringify(data, null, 2));
  res.json(data.characters[index]);
});

app.delete('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.characters = data.characters.filter((char) => char.id !== id);
  fs.writeFileSync('./characters.json', JSON.stringify(data, null, 2));
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

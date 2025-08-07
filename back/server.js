const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

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

app.post('/characters', (req, res) => {
  const newChar = { id: Date.now(), ...req.body };
  data.characters.push(newChar);
  fs.writeFileSync('./characters.json', JSON.stringify(data, null, 2));
  res.status(201).json(newChar);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

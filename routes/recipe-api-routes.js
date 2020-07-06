const express = require('express');

const db = require('../models/Recipe');
const api = require('../utils/axios');

const app = express();

// Find all Recipies and return them to the user with res.json
app.get('/', (req, res) => {
  db.Recipe.findAll({}).then((dbRecipe) => {
    res.json(dbRecipe);
  });
});

app.get('/api/recipe/:id', (req, res) => {
  // Find one Recipe with the id in req.params.id and return them to the user with res.json
  db.Recipe.findOne({
    where: {
      id: req.params.id,
    },
  }).then((dbRecipe) => {
    res.json(dbRecipe);
  });
});

app.post('/api/recipe', (req, res) => {
  // Save Recipe info in to the DB with the data available to us in req.body
  console.log(req.body);
  db.Recipe.create(req.body).then((dbRecipe) => {
    res.json(dbRecipe);
  });
});

app.post('/api/search', async (req, res) => {
  const searchTerm = req.body.term;
  const cuisinePref = req.body.cuisine;
  const dietPref = req.body.diet;
  const allergies = req.body.allergy;
  console.log(searchTerm);
  res.json(searchTerm);
  const data = await api.userSearch(searchTerm, cuisinePref, dietPref, allergies);
  console.log(data);
});

app.delete('/api/recipe/:id', (req, res) => {
  // Delete the Recipe with the id available to us in req.params.id
  db.Recipe.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbRecipe) => {
    res.json(dbRecipe);
  });
});

module.exports = app;

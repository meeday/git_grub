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

// app.post('/api/recipe', (req, res) => {
//   // Save Recipe info in to the DB with the data available to us in req.body
//   console.log(req.body);
//   db.Recipe.create(req.body).then((dbRecipe) => {
//     res.json(dbRecipe);
//   });
// });

app.post('/api/search', async (req, res) => {
  const searchTerm = req.body.term;
  const cuisinePref = req.body.cuisine;
  const dietPref = req.body.diet;
  const allergies = req.body.allergy;
  console.log(searchTerm);
  const data = await api.userSearch(searchTerm, cuisinePref, dietPref, allergies);
  const recipeId = (data.results.map((recipe) => recipe.id)).toString();
  console.log(recipeId);
  const recipeSearch = await api.recipeInBulk(recipeId);
  const instructions = recipeSearch.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    summary: recipe.instructions,
    cuisine: recipe.cuisines,
    vegan: recipe.vegan,
    vegetarian: recipe.vegetarian,
    imageUrl: recipe.image,
    time: recipe.readyInMinutes,
  }));
  console.log(instructions);
  res.json(instructions);
});

app.post('/api/recipe', async (req, res) => {
  console.log(req.body);
  

  db.Recipe.create({
  id: req.body.id,
  googleId: req.body.googleId,
  recipeId: req.body.recipeId,
  title: req.body.title,
  summary: req.body.summary,
  cuisine: req.body.cuisine,
  vegan: req.body.vegan,
  imageUrl: req.body.imageUrl,
  time: req.body.time,
  comments: req.body.comments
  })
  .then((dataToSave) => {
    res.json(dataToSave);
  });
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

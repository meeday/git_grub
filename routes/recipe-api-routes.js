const express = require('express');
const db = require('../models/Recipe');
const api = require('../utils/axios');
const { authCheck, guestCheck } = require('../middleware/auth');

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

// Route for search results (all parameters)
app.get('/api/recipe/:search/:cuisine/:diet/:allergy', authCheck, async (req, res) => {
  let searchTerm = req.params.search;
  let cuisinePref = req.params.cuisine;
  let dietPref = req.params.diet;
  let allergies = req.params.allergy;
  if (searchTerm === 'blank') {
    searchTerm = '';
  }

  if (cuisinePref === 'blank') {
    cuisinePref = '';
  }

  if (dietPref === 'blank') {
    dietPref = '';
  }

  if (allergies === 'blank') {
    allergies = '';
  }
  try {
    const data = await api.userSearch(searchTerm, cuisinePref, dietPref, allergies);
    const recipeId = (data.results.map((recipe) => recipe.id)).toString();
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
    res.render('recipe', { 
      recipes: instructions,
      searchTerm,
      cuisinePref,
      dietPref,
      allergies,
    });
  } catch (err) {
    console.error('ERROR - recipe-api-routes.js - get/api/recipe', err);
  }
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

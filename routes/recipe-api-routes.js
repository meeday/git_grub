const express = require('express');
const db = require('../models/Recipe');
const api = require('../utils/axios');
const { authCheck, guestCheck } = require('../middleware/auth');

const app = express();

// Find all Recipies and return them to the user with res.json
app.get('/', (req, res) => {
  db.Recipe.findAll({}).then((dbRecipe) => {
    console.log(dbRecipe);

    res.render("dashboard", { recipe: dbRecipe });
  });
});


// PUT route for create or updating comments
app.put("/api/dashboard/:id", function (req, res) {
  db.Recipe.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function (dbRecipe) {
      res.render('dashboard', { recipe: dbRecipe })
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

app.post('/api/member', async (req, res) => {
  // console.log(req.body);


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
    .then((dbRecipe) => {
      res.render("dashboard", { recipe: dbRecipe });
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

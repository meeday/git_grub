const express = require('express');
const db = require('../models/Recipe');
const api = require('../utils/axios');
const { authCheck } = require('../middleware/auth');

const app = express();

// Find all Recipies and return them to the user with res.render
app.get('/dashboard', authCheck, async (req, res) => {
  try {
    const result = await db.findAll({
      where: {
        googleId: req.user.googleId,
      },
    });
    res.render('dashboard',
      {
        result,
        displayName: req.user.displayName,
        firstName: req.user.firstName,
        surname: req.user.surname,
        avatar: req.user.avatar,
        id: req.user.googleId,
      });
  } catch (err) {
    console.error('ERROR - recipe-api-routes.js - get/dashboard', err);
  }
});

// PUT route for create or updating comments
app.put('/api/dashboard/:id', async (req, res) => {
  try {
    const result = await db.update(
      { comments: req.body.newComment },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200);
  } catch (err) {
    console.error('ERROR - recipe-api-routes.js - put/api/dashboard/:id', err);
  }
});

// Route for search results (all parameters)
app.get('/api/recipe/:search/:cuisine/:diet/:allergy', authCheck, async (req, res) => {
  // Hold req.params in variables
  let searchTerm = req.params.search;
  let cuisinePref = req.params.cuisine;
  let dietPref = req.params.diet;
  let allergies = req.params.allergy;
  // If statement to replace blank keyword with an empty string avoid API error
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
  // Query DB for all recipes associated with logged in user
  try {
    const recipeList = await db.findAll({
      where: {
        googleId: req.user.googleId,
      },
      attributes: ['recipeId'],
    });
    // Create an array of recipe IDs saved to logged in user's dashboard
    const idArray = recipeList.map((recipe) => recipe.dataValues.recipeId);
    // Make api call using user's inputs as arguments
    const data = await api.userSearch(searchTerm, cuisinePref, dietPref, allergies);
    // Loop through array of recipe objects and return a new array of IDs only and convert to string
    const recipeId = (data.results.map((recipe) => recipe.id)).toString();
    // Second api call to retrieve instructions using list of IDs as an argument
    const recipeSearch = await api.recipeInBulk(recipeId);
    // Create new object for each recipe to be rendered to front end
    const instructions = recipeSearch.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      summary: recipe.instructions,
      cuisine: recipe.cuisines,
      vegan: recipe.vegan,
      vegetarian: recipe.vegetarian,
      imageUrl: recipe.image,
      time: recipe.readyInMinutes,
      isInDb: idArray.includes(recipe.id),
    }));
    // Render recipe.handlebars file, passing in recipe objects
    res.render('recipe', {
      recipes: instructions,
      searchTerm,
      cuisinePref,
      dietPref,
      allergies,
      googleId: req.user.googleId,
      avatar: req.user.avatar,
      displayName: req.user.displayName,
    });
  } catch (err) {
    res.redirect('/error');
    console.error('ERROR - recipe-api-routes.js - get/api/recipe', err);
  }
});

app.post('/api/recipe', async (req, res) => {
  try {
    const data = await db.create({
      id: req.body.id,
      googleId: req.body.googleId,
      recipeId: req.body.recipeId,
      title: req.body.title,
      summary: req.body.summary,
      cuisine: req.body.cuisine,
      vegetarian: req.body.vegetarian,
      imageUrl: req.body.imageUrl,
      time: req.body.time,
      comments: req.body.comments,
    });
    if (data.affectedRows === 0) {
      return res.status(500).end();
    }
    res.status(200);
  } catch (err) {
    console.error('ERROR - recipe-api-routes.js - post/api/recipe', err);
  }
});

// Delete the Recipe with the id available to us in req.params.id
app.delete('/api/recipe/:id', async (req, res) => {
  try {
    const data = await db.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(data);
  } catch (err) {
    console.error('ERROR - recipe-api-routes.js - delete/api/recipe/:id', err);
  }
});

module.exports = app;

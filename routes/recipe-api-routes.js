const express = require('express');

const db = require("../models/Recipe");

  // Find all Recipies and return them to the user with res.json
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  app.get("/api/recipe/:id", function(req, res) {
    // Find one Recipe with the id in req.params.id and return them to the user with res.json
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  app.post("/api/recipe", function(req, res) {
    // Save Recipe info in to the DB with the data available to us in req.body
    console.log(req.body);
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  app.delete("/api/recipe/:id", function(req, res) {
    // Delete the Recipe with the id available to us in req.params.id
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

};

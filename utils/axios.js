const axios = require('axios');

const config = require('../config/config');

const apiKey = config.api.key;

const api = {
  async userSearch(str, cuisine, diet, excludeIngredients, intolerances) {
    const results = await axios.get(`https://api.spoonacular.com/recipes/search?query=${str}&cuisine=${cuisine}&diet=${diet}&excludeIngredients=${excludeIngredients}&intolerances=${intolerances}&number=40&instructionsRequired=true&apiKey=${apiKey}`);
    return results.data;
  },
  async searchByIngredients(str, intolerances, cuisine, diet, excludeIngredients) {
    let ingredients = [];
    ingredients = str.split(',');
    const firstIng = ingredients.shift();
    let searchQuery;
    let list = '';
    for (let i = 0; i < ingredients.length; i += 1) {
      list += `, +${ingredients[i]}`;
      searchQuery = `${firstIng}${list}`;
    }
    const results = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchQuery}&cuisine=${cuisine}&diet=${diet}&excludeIngredients=${excludeIngredients}&intolerances=${intolerances}&number=40&instructionsRequired=true&apiKey=${apiKey}`);
    return results.data;
  },
};

module.exports = api;

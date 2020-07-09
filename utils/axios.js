const axios = require('axios');

const config = require('../config/config');

const apiKey = config.api.key;

const api = {
  async userSearch(str, cuisine, diet, intolerances) {
    const results = await axios.get(`https://api.spoonacular.com/recipes/search?query=${str}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&number=15&instructionsRequired=true&apiKey=${apiKey}`);
    return results.data;
  },
  async recipeInBulk(str) {
    const results = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${str}&number=15&apiKey=${apiKey}`);
    return results.data;
  },
};

module.exports = api;

// const config = require('../../config/config');
// const api = require('../../utils/axios');
const searchBtn = $('#search-icon');
const searchQuery = $('#search-query');
const cuisineSearch = $('.cuisine');
const dietSearch = $('.diet');
const intolerance = $('.intolerance');

searchBtn.on('click', () => {
  const searchTerm = searchQuery.val().trim();
  const cuisinePref = cuisineSearch.children('option:selected').html();
  const dietPref = dietSearch.children('option:selected').html();
  const allergies = intolerance.children('option:selected').html();

  console.log(searchTerm);
  console.log(cuisinePref);
  console.log(dietPref);
  console.log(allergies);
});

// console.log(cuisineSearch);
// console.log(dietSearch);
// console.log(intolerance);

// api.userSearch(searchQuery);
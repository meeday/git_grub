$(document).ready(() => {
  $('.sidenav').sidenav();
});

$(document).ready(() => {
  $('select').formSelect();
});

// Search Selection
const cuisineBtn = $('#cuisine-btn');
const dietBtn = $('#diet-btn');
const cuisineDropdown = $('#cuisine-dropdown');
const intoleranceDropdown = $('#intolerance-dropdown');
const dietDropdown = $('#diet-dropdown');

// Search Filter Function
cuisineBtn.on('click', () => {
  dietDropdown.hide();
  intoleranceDropdown.show();
  cuisineDropdown.show();
});

dietBtn.on('click', () => {
  cuisineDropdown.hide();
  intoleranceDropdown.show();
  dietDropdown.show();
});

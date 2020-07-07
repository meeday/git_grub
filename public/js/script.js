$(document).ajaxStart(() => {
  $('.loading').removeClass('display-none');
});

// Hide loading spinner and show search button when ajax call completes

$(document).ajaxStop(() => {
  $('.loading').addClass('display-none');
});

const searchBtn = $('#search-icon');
const searchQuery = $('#search-query');

searchBtn.on('click', async () => {
  let searchTerm = searchQuery.val().trim();
  let cuisinePref = ($('.cuisine option:selected').toArray().map((item) => item.text)).toString();
  let dietPref = ($('.diet option:selected').toArray().map((item) => item.text)).toString();
  let allergies = ($('.intolerance option:selected').toArray().map((item) => item.text)).toString();
  const preferences = {
    term: searchTerm,
    cuisine: cuisinePref,
    diet: dietPref,
    allergy: allergies,
  };
  const { origin } = window.location;
  if (searchTerm === '') {
    searchTerm = 'blank';
  }

  if (cuisinePref === '') {
    cuisinePref = 'blank';
  }

  if (dietPref === '') {
    dietPref = 'blank';
  }

  if (allergies === '') {
    allergies = 'blank';
  }
  console.log(allergies);

  window.location.replace(`${origin}/api/recipe/${searchTerm}/${cuisinePref}/${dietPref}/${allergies}`);
  try {
    const result = await $.ajax({
      url: `/api/recipe/${searchTerm}/${cuisinePref}/${dietPref}/${allergies}`,
      method: 'GET',
      data: preferences,
    });
    console.log(result);
  } catch (err) {
    console.error('ERROR - script.js - searchBtn: ', err);
  }
});

$(document).ready(() => {
  const saveToDb = $('.far');

  // click event for save button
  saveToDb.on('click', (event) => {
    // get data from ajax call
    const dataTodo = {
      id: 'concatenation of googleId and recipeId',
      goodleId: $('#user-name').data('id'),
      recipeId: $(event.target).parent().parent().data('id'),
      title: $(event.target).parent().parent().find('.title')
        .html(),
      summary: $(event.target).parent().parent().parent()
        .find('.summary')
        .html(),
      cuisine: $(event.target).parent().parent().parent()
        .find('.cuisine')
        .html(),
      vegan: false,
      imageUrl: $(event.target).parent().parent().find('.food-img')
        .attr('src'),
      time: $(event.target).parent().parent().parent()
        .parent()
        .find('.time')
        .html(),
      comments: null,
    };

    $.ajax({
      type: 'POST',
      url: '/api/recipe',
      data: dataTodo,
      timeout: 5000,
      success(data) {
        alert(`${data.title}Recipe successfully saved !`);
      },
      error() {
        alert('Error Occored !');
      },
      complete: false,
    });

    console.log(dataTodo);
    console.log(event.target);
  });
});
// this function save Recipe to the DB
//   function saveRecipe(event, dataTodo) {
//    // event.preventDefault();
//     $.ajax({
//       type: 'POST',
//       url: '/api/recipe',
//       data: dataTodo,
//       timeout: 5000,
//       success: function (data) {
//         alert(data.title + 'Recipe successfully saved !')
//       },
//       error: function () {
//         alert('Error Occored !');
//       },
//       complete: false
//     });
//   }
// });

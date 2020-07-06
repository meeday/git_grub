const searchBtn = $('#search-icon');
const searchQuery = $('#search-query');

searchBtn.on('click', () => {
  const searchTerm = searchQuery.val().trim();
  const cuisinePref = ($('.cuisine option:selected').toArray().map((item) => item.text)).toString();
  const dietPref = ($('.diet option:selected').toArray().map((item) => item.text)).toString();
  const allergies = ($('.intolerance option:selected').toArray().map((item) => item.text)).toString();
  //  console.log(searchTerm);
  const preferences = {
    term: searchTerm,
    cuisine: cuisinePref,
    diet: dietPref,
    allergy: allergies,
  };
  $.ajax({
    url: '/api/search',
    method: 'POST',
    data: preferences,
  }).then((result) => console.log(result));
});

$(document).ready(() => {
  const saveToDb = $('.far');


  //click event for save button
  saveToDb.on('click', (event) => {
    //get data from ajax call
    const dataTodo = {
      id: 'concatenation of googleId and recipeId',
      goodleId: $('#user-name').data('id'),
      recipeId: $(event.target).parent().parent().data('id'),
      title: $(event.target).parent().parent().find('.title').html(),
      summary: $(event.target).parent().parent().parent().find('.summary').html(),
      cuisine: $(event.target).parent().parent().find('.cuisine').html(),
      vegan: false,
      imageUrl: $(event.target).parent().parent().find('.food-img').attr('src'),
      time: $(event.target).parent().parent().find('.time').html(),
      comments: null
    }

    $.ajax({
      type: 'POST',
      url: '/api/recipe',
      data: dataTodo,
      timeout: 5000,
      success: function (data) {
        alert(data.title + 'Recipe successfully saved !')
      },
      error: function () {
        alert('Error Occored !');
      },
      complete: false
    });

    console.log(dataTodo);
    console.log(event.target);
  });
});
  //this function save Recipe to the DB
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
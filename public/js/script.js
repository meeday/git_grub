

$('.collapsible .unsaved').on('click', (e) => {
  e.stopPropagation();
});

const searchBtn = $('#search-icon');
const searchQuery = $('#search-query');

searchBtn.on('click', async () => {
  $(document).ajaxStart(() => {
    $('.loading').removeClass('display-none');
  });
  
  // Hide loading spinner and show search button when ajax call completes
  
  $(document).ajaxStop(() => {
    $('.loading').addClass('display-none');
  });
  
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

  window.location.replace(`${origin}/api/recipe/${searchTerm}/${cuisinePref}/${dietPref}/${allergies}`);
  try {
    const result = await $.ajax({
      url: `/api/recipe/${searchTerm}/${cuisinePref}/${dietPref}/${allergies}`,
      method: 'GET',
      data: preferences,
    });
  } catch (err) {
    console.error('ERROR - script.js - searchBtn: ', err);
  }
});

$(document).ready(() => {
  const saveToDb = $('.far');
  const addComments = $('.comment');

  // click event for save button
  saveToDb.on('click', (event) => {
    // get data from ajax call
    const dataTodo = {
      googleId: $('#user-name').data('id'),
      recipeId: $(event.target).parent().parent().data('id'),
      id: ($('#user-name').data('id')) + ($(event.target).parent().parent().data('id')),
      title: $(event.target).parent().parent().find('.title')
        .html(),
      summary: $(event.target).parent().parent().parent()
        .find('.summary')
        .html(),
      cuisine: $(event.target).parent().parent().parent()
        .find('.cuisine')
        .html(),
      vegetarian: false,
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
      success(data) {
        alert(`${data.title}Recipe successfully saved !`);
      },
      complete: false,
    });
  });

  // create or update comments
  addComments.on('click', (event) => {
    const id = $(this).data('id');
    const newComment = $(this).find('.summary').html();

    $.ajax({
      method: 'PUT',
      url: `/api/dashboard${id}`,
      data: newComment,
    })
      .then(() => {
        window.location.href = '/api/dashboard';
      });
  });
});

$('.delete').on('click', (e) => {
  const recId = $(e.target).parent().parent().data('id');
  const title = $(e.target).parent().parent().find('.title').html();
  $('.destroy').data('id', recId);
  $('.modal-title').text(title);
  e.stopPropagation();
  $('#modal1').modal();
  
});

$('.destroy').on('click', (e) => {
  const deletedId = $(e.target).data('id');
  
  $.ajax({
    method: 'DELETE',
    url: `/api/recipe/${deletedId}`,
  }).then(() => {
    window.location.href = '/dashboard';
  });
});

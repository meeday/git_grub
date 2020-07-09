$('.collapsible .unsaved').on('click', (e) => {
  e.stopPropagation();
});

$('#search-query').keypress((e) => {
  if (e.which == 13) {
    $('#search-icon').click();
  }
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
  const addComments = $('.comment-save');

  // click event for save button
  saveToDb.on('click', (event) => {
    // Get the modal
    const modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
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
    }).then(() => {
      console.log('success');
    });
    modal.style.display = 'block';
  });

  // create or update comments
  addComments.on('click', (event) => {
    // Get the modal
    const modal = document.getElementById('myModal');

    // Get the button that opens the modal
    const btn = document.getElementById('myBtn');

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

    const id = $(event.target).parent().parent().siblings()
      .data('id');
    // const comments = {
    //   newComment: $(event.target).parent().find('.comment').val(),
    // };
    const textId = ($(event.target).parent().find('.cke').attr('id'));
    const textName = textId.replace('cke_', '');
    const comments = {
      newComment: CKEDITOR.instances[textName].getData(),
    };

    $.ajax({
      method: 'PUT',
      url: `/api/dashboard/${id}`,
      data: comments,
    })
      .then(() => {
        // window.location.href = '/dashboard';
      });
    modal.style.display = 'block';
  });
});

$('.delete').on('click', (e) => {
  const recId = $(e.target).parent().parent().data('id');
  const title = $(e.target).parent().parent().find('.title')
    .html();
  $('.destroy').data('id', recId);
  $('.modal-title').text(title);
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

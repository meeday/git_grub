$(document).ready(() => {
  // Declaration of global variables
  const searchBtn = $('#search-icon');
  const searchQuery = $('#search-query');
  const saveToDb = $('.saveBtn');
  const addComments = $('.comment-save');

  // Add class to caret using materialize class
  $('.caret').addClass('white');

  // Prevent bubbling on collapsible when saved button is clicked
  $('.collapsible .saveBtn').on('click', (e) => {
    e.stopPropagation();
  });

  // Trigger search button with enter key
  $('#search-query').keypress((e) => {
    if (e.which == 13) {
      $('#search-icon').click();
    }
  });

  // Search button function
  searchBtn.on('click', async () => {
    // Trigger loading spinner when ajax call initiates
    $(document).ajaxStart(() => {
      $('.loading').removeClass('display-none');
    });

    // Hide loading spinner when ajax call completes
    $(document).ajaxStop(() => {
      $('.loading').addClass('display-none');
    });

    // Variables to target user input
    let searchTerm = searchQuery.val().trim();
    let cuisinePref = ($('.cuisine option:selected').toArray().map((item) => item.text)).toString();
    let dietPref = ($('.diet option:selected').toArray().map((item) => item.text)).toString();
    let allergies = ($('.intolerance option:selected').toArray().map((item) => item.text)).toString();
    // Object containing user input to send to back end
    const preferences = {
      term: searchTerm,
      cuisine: cuisinePref,
      diet: dietPref,
      allergy: allergies,
    };
    // If statements to manage null values for search parameters
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

    // Change url to hit required endpoint
    window.location.replace(`${origin}/api/recipe/${searchTerm}/${cuisinePref}/${dietPref}/${allergies}`);
    // Get request to retrieve data from API
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

  // click event for save button
  saveToDb.on('click', async (event) => {
    // Confirmation modal
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName('close')[0];
    span.onclick = function () {
      modal.style.display = 'none';
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

    // Dynamically change heart colour
    $(event.target).addClass('saved');
    $(event.target).attr('data-tooltip', 'Saved to your recipes');

    // Create object to be sent to back end to be added to DB
    const dataTodo = {
      googleId: $('#user-name').data('id'),
      recipeId: $(event.target).parent().parent().parent()
        .data('id'),
      id: ($('#user-name').data('id')) + ($(event.target).parent().parent().parent()
        .data('id')),
      title: $(event.target).parent().parent().find('.title')
        .html(),
      summary: $(event.target).parent().parent().parent()
        .parent()
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
    try {
      const result = await $.ajax({
        type: 'POST',
        url: '/api/recipe',
        data: dataTodo,
      });
      modal.style.display = 'block';
    } catch (err) {
      console.error('ERROR - script.js - saveToDb: ', err);
    }
  });

  // Add notes function
  addComments.on('click', async (event) => {
    // Confirmation modal
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName('close')[0];
    span.onclick = function () {
      modal.style.display = 'none';
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
    // Target DOM elements to add comments to DB
    const id = $(event.target).parent().parent().siblings()
      .data('id');
    const textId = ($(event.target).parent().find('.cke').attr('id'));
    const textName = textId.replace('cke_', '');
    const comments = {
      newComment: CKEDITOR.instances[textName].getData(),
    };
    try {
      // Ajax call to update DB
      const result = await $.ajax({
        method: 'PUT',
        url: `/api/dashboard/${id}`,
        data: comments,
      });
      modal.style.display = 'block';
    } catch (err) {
      console.error('ERROR - script.js - addComments: ', err);
    }
  });

  // Pass recipe information to the modal when delete button is clicked
  $('.delete').on('click', (e) => {
    const recId = $(e.target).parent().parent().parent()
      .data('id');
    const title = $(e.target).parent().parent().find('.title')
      .html();
    $('.destroy').data('id', recId);
    $('.modal-title').text(title);
  });

  // Function to delete recipe from DB
  $('.destroy').on('click', async (e) => {
    const deletedId = $(e.target).data('id');
    try {
      const result = await $.ajax({
        method: 'DELETE',
        url: `/api/recipe/${deletedId}`,
      });
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('ERROR - script.js - destroy: ', err);
    }
  });
});

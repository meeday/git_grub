const searchBtn = $('#search-icon');
const searchQuery = $('#search-query');

searchBtn.on('click', async () => {
  let searchTerm = searchQuery.val().trim();
  let cuisinePref = ($('.cuisine option:selected').toArray().map((item) => item.text)).toString();
  let dietPref = ($('.diet option:selected').toArray().map((item) => item.text)).toString();
  let allergies = ($('.intolerance option:selected').toArray().map((item) => item.text)).toString();
  let preferences = {
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
  } catch (err) {
    console.error('ERROR - script.js - searchBtn: ', err);
  }
});

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

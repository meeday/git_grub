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
  }).then((result) => result.forEach(element => {
    `<ul class="collapsible results">
    <li>
    <div class="collapsible-header blue-grey lighten-1 row valign-wrapper" data-id="532245">
        <div class="col s12 m2"><img class="food-img" src="https://spoonacular.com/recipeImages/532245-556x370.jpg"
                alt=""></div>
        <div class="col s12 m9">
            <h4 class="title">${element.title}</h4>
            <div class="details">
                {{#if cuisine}}
                <h6><i class="fas fa-utensils"></i><span class="cuisine">Side Dish</span></h6>
                {{/if}}
                {{!-- {{#if vegetarian}} --}}
                <h6 class="vegetarian"><i class="fas fa-carrot"></i>Vegetarian</h6>
                {{!-- {{/if}} --}}
                {{!-- {{#if time}} --}}
                <h6 class="time"><i class="fas fa-clock"></i></i>60 minutes</h6>
                {{!-- {{/if}} --}}
            </div>
        </div>
        <div class="col s12 m1 save-box">
            {{!-- {{#if inDb}} --}}
            <i class="fas fa-heart saved"></i>
            <p>Saved to My Recipes</p>
            {{!-- {{/if}} --}}
            {{!-- {{#unless inDb}}
            <i class="far fa-heart unsaved"></i>
            Click to save to My Recipes
            {{/#unless}} --}}
        </div>
    </div>
    <div class="collapsible-body grey blue-grey lighten-5">
        <span class="summary">${recipe.summary}</span></div>
</li>
</ul>
    `
    
    
  });;
});

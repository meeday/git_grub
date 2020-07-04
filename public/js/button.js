// Menu btn
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

$(document).ready(function(){
  $('.sidenav').sidenav();
});

// Cuisine Drop Down
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

// Or with jQuery

$(document).ready(function(){
  $('select').formSelect();
});
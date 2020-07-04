// Search Selection
const cuisineBtn = $("#cuisine-btn");
const intoleranceBtn = $("#intolerance-btn");
const dietBtn = $("#diet-btn");
const cuisineDropdown = $("#cuisine-dropdown");
const intoleranceDropdown = $("#intolerance-dropdown");

// Search Filter Function
cuisineBtn.on("click", () => {
    intoleranceDropdown.hide();
    cuisineDropdown.show();
});

intoleranceBtn.on("click", () => {
    cuisineDropdown.hide();
    intoleranceDropdown.show();
});

dietBtn.on("click", () => {
    cuisineDropdown.hide();
    intoleranceDropdown.hide();
})

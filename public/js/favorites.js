// Javascript for user to click on Spoonacular API recipe results and add to favorites
// Data that should already be pulled from the API: recipeID, recipe image, recipe URL
//

var favorites = "";

// Assuming each recipe has ID "recipe" 
// Can click on recipe and it will appear in the favorites section

$("#recipe").on("click", function(e) {
    e.preventDefault();
    var addFavorite = $("#favorites").eq(0).val();
    favorites.push(addFavorite);
});
addContent(favorites, "fav-tab", "#favorites");

module.exports = favorites;
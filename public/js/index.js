// Get references to page elements
var $searchInput = $("#search-bar");
var $exampleDescription = $("#example-description");
var $searchButton = $("#search-btn");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  search: function($search) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/ingredients",
      data: JSON.stringify($search)
    });
  },
  getIngredient: function() {
    return $.ajax({
      url: "api/ingredients",
      type: "GET"
    });
  },
  deleteIngredient: function(id) {
    return $.ajax({
      url: "api/ingredients/" + id,
      type: "DELETE"
    });
  }
};

//Show or hide password
function showPassword() {
  var x = document.getElementById("pwInput");
  if (x.type === "password") {
    x.type= "text";
  }else {
    x.type = "password";
  }
}

//Show Create Account Form

$(".newAccount").click(function(e){
  $("#companyName, #buttons").addClass("hidden");
  $("#newAccountForm, #setupAccountTitle").removeClass("hidden");
});

//Show Sign In Form
$(".signIn").click(function(e)
{
  $(
    "#companyName, #buttons, .firstName, .lastName, .emailInput, #setupAccountTitle"
  ).addClass("hidden");
  $("#newAccountForm, #signInTitle").removeClass("hidden");
});

//Show Home page if you click cancel on the create account page
$("#signInCancelButton").click(function(e){
  e.preventDefault();
  $("#companyName, #buttons, .firstName, .lastName, .emailInput").removeClass(
    "hidden"
  );

  $("#newAccountForm, #setupAccountTitle, #signInForm, #signInTitle").addClass(
    "hidden"
  );
  document.getElementById("newAccountForm").reset();
});

// refreshExamples gets new examples from the db and repopulates the list
var refreshIngredients = function() {
  API.getIngredient().then(function(data) {
    var $ingredient = data.map(function(ingredient) {
      var $a = $("<a>")
        .text(ingredient.foodName)
        .attr("href", "/ingredient/" + ingredient.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": ingredient.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $ingredientList.empty();
    $ingredientList.append($ingredient);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var search = {
    foodName: $searchInput.val().trim(),
    searchScore: search.searchScore + 1
  };

  if (!search.foodName) {
    alert("You must enter a search parameter!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshIngredients();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

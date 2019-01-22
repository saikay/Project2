
// Get references to page elements
var $searchInput = $("#search-bar");
var $exampleDescription = $("#example-description");
var $searchButton = $("#search-btn");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  search: function ($search) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/ingredients",
      data: JSON.stringify($search)
    });
  },
  getIngredient: function () {
    return $.ajax({
      url: "api/ingredients",
      type: "GET"
    });
  },
  deleteIngredient: function (id) {
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
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showPassword2() {
  var x = document.getElementById("pwResult");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

var Hook = function () {
  this.signIn = $(".signIn");
  this.signUp = $(".signUp");
  this.sign = $("#sign");
  this.button = $("body button");
  this.first = $("#firstNameInput").val().trim();
  this.last = $("#lastNameInput").val().trim();
  this.email = $("#emailInput").val().trim();
  this.user = $("#userNameInput").val().trim();
  this.pass = $("#pwInput").val().trim();
  this.form = $("#newAccountForm");
  this.main = $(".mainView");
  this.signUpT = $("#setupAccountTitle")
  this.signInT = $("#signInTitle")

  this.show = (arg) => {
    arg.removeClass("hidden");
    return arg;
  };
  this.hide = (arg) => {
    arg.addClass("hidden");
    return arg;
  };
  return this;
};

var hook = new Hook();

hook.button.on("click", function (e) {
  e.preventDefault();
  var b = $(this);
  switch (b.attr("id")) {
    case "signIn":
      showForm(true);
      break;
    case "newAccount":
      showForm(false);
      break;
    case "sign":
      if (b.data("form") === 0) {
        //create account
      } else {
        //sign in
      }
      break;
    case "cancelButton":
      hook.hide(hook.form);
      hook.show(hook.main);
      break;

  }
})
//form showing funciton true = signIn, false = signUp
var showForm = function (bool) {
  hook.show(hook.form);
  hook.hide(hook.main);

  if (bool) {
    hook.sign
      .html("Sign In")
      .attr("data-form", 1)
    hook.show(hook.signIn);
    hook.hide(hook.signUp);
    hook.hide(hook.signUpT);
  } else {
    hook.sign
      .html("sign Up")
      .attr("data-form", 0)
    hook.show(hook.signUp);
    hook.hide(hook.signInT);
  }
};




// refreshExamples gets new examples from the db and repopulates the list
var refreshIngredients = function () {
  API.getIngredient().then(function (data) {
    var $ingredient = data.map(function (ingredient) {
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
var handleFormSubmit = function (event) {
  event.preventDefault();

  var search = {
    foodName: $searchInput.val().trim(),
    searchScore: search.searchScore + 1
  };

  if (!search.foodName) {
    alert("You must enter a search parameter!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshIngredients();
  });
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
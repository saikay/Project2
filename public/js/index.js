


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

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

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


var queryData = [];
//Listener for any button click
hook.button.on("click", function (e) {
  var b = $(this);
  //using switch to decide the functionality of each button
  switch (b.attr("id")) {
    case "signIn":
      e.preventDefault();
      showForm(true);
      break;
    case "newAccount":
      e.preventDefault();
      showForm(false);
      break;
    case "cancelButton":
      e.preventDefault();
      hook.hide(hook.form);
      hook.hide(hook.signInT);
      hook.hide(hook.signUpT);
      hook.show(hook.main);
      break;
  }
})
//form showing funciton true = signIn, false = signUp
$(".favorite-btn").click(function(e){
  e.preventDefault();
    var fId = $(this).data("id");
    var user = $(".userName").data("user");
    var link = $(`.link-${fId}`).attr("href");
    var image = $(`.image-${fId}`).attr("src");
    var title = $(`.title-${fId}`).html();
    var data = {
      userName: user,
      recipeName: title,
      image: image,
      recipeURL: link,
      recipeID: fId
    };

    $.ajax({
      url: "api/favorites",
      type: "POST",
      data: data
    });
})

const breakDown = (arg) => {
  arg.replace(/ /g, "%2C");
  return arg;
}

var showForm = function (bool) {
  hook.show(hook.form);
  hook.hide(hook.main);

  if (bool) {
    hook.sign
      .html("Sign In")
      .attr("data-form", 1)
    hook.form
      .attr({
        id: "signin",
        name: "signin",
        action: "signin"
      })
    hook.show(hook.signIn);
    hook.show(hook.signInT);
    hook.hide(hook.signUp);
    hook.hide(hook.signUpT);
  } else {
    hook.sign
      .html("Sign Up")
      .attr("data-form", 0)
    hook.form
      .attr({
        id: "signup",
        name: "signup",
        action: "signup"
      });
    hook.show(hook.signUpT)
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

  var favorite = {
    foodName: $searchInput.val().trim(),
    searchScore: search.searchScore + 1
  };

  if (!search.foodName) {
    alert("You must enter a search parameter!");
    return;
  }

  API.saveFavorite(search).then(function () {
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

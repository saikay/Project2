
//Show or hide password
const showPassword = () => {
  const x = document.getElementById("pwInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


const showPassword2 = () => {
  const x = document.getElementById("pwResult");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


let queryData = [];
//Listener for any button click
hook.button.on("click", function(e){
  let b = $(this);
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
$(".favorite-btn").click(function (e){
  e.preventDefault();
    let fId = $(this).data("id");
    let user = $(".userName").data("user");
    let link = $(`.link-${fId}`).attr("href");
    let image = $(`.image-${fId}`).attr("src");
    let title = $(`.title-${fId}`).html();
    let data = {
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

const showForm = (bool) => {
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
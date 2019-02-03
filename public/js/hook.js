//Contructor lets us easily access ids and classes
let Hook = function () {
    this.signIn = $(".signIn");
    this.signUp = $(".signUp");
    this.sign = $("#sign");
    this.button = $("body button");
    if (document.URL === "/"){
      this.first = $("#firstNameInput").val().trim();
      this.last = $("#lastNameInput").val().trim();
      this.email = $("#emailInput").val().trim();
      this.user = $("#userNameInput").val().trim();
      this.pass = $("#pwInput").val().trim();
    }
    this.form = $(".newAccountForm");
    this.main = $(".mainView");
    this.signUpT = $("#setupAccountTitle");
    this.signInT = $("#signInTitle");
  
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
  //Initialize constructor
  let hook = new Hook();
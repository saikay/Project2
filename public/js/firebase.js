var user = require("../../config/connection.js")

const $userEmail = $("#user-email").val().trim();
const $userName = $("#user-name").val().trim();
const $userPass = $("#user-password").val().trim();
const $firstName = $("#user-firstName").val().trim();
const $lastName = $("#user-lastName").val().trim();

$("#sign").on("click", (e) => {
    e.preventDefault();
    var form = $(this).data("form");
    var displayName = $("#display-name");
    if(form === true){
        user.create($userName, $userEmail, $userPass, $firstName, $lastName);
    } else {
        user.signIn($userEmail, $userPass);
    }
    displayName.html(user.userInfo.displayName)
});
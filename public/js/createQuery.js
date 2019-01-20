const $searchInput = $("#search-bar").val().trim();
const $searchButton = $("#search-btn");
var queryString;

const breakDown = (arg) => {
    arg.split(" ").join(",");
    return arg;
}

$($searchButton).on("click", function(event){
    event.preventDefault();
    queryString = breakDown($searchInput);
});

module.exports = queryString;
const $searchInput = $("#search-bar").val().trim();
const $searchButton = $("#search-btn");
const queryString = breakDown($searchInput);

const breakDown = (arg) => {
    arg.split(" ").join(",");
    return arg;
}

$($searchButton).on("click", function(event){
    event.preventDefault();
    queryString;
});


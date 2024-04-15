//inject the name of the search from the search

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

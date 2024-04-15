//inject the name of the search from the search

let apiKey = "3tcfof90f4d5fcef43527800bff1b7ea";

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  // city.innerHTML = searchInput.value;
  let searchInputValue = searchInput.value;
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${searchInputValue}&key=${apiKey}`;
  axios.get(url).then((Response) => {
    city.innerHTML = Response.data.city;
  });
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

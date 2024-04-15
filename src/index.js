//inject the name of the search from the search

let apiKey = "3tcfof90f4d5fcef43527800bff1b7ea";
//get results from api
function refreshWeather(Response) {
  //make api call and update the ui
  let cityplaceholder = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let temp = Math.round(Response.data.temperature.current);
  temperature.innerHTML = `${temp}°C`;
  cityplaceholder.innerHTML = Response.data.city;
}

//function to handle search
function searchCity(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(refreshWeather);
}
function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("paris");

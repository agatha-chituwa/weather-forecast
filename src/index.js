//inject the name of the search from the search

let apiKey = "3tcfof90f4d5fcef43527800bff1b7ea";
//this function will get the conditions humidity and winds okay?

//get results from api
function refreshWeather(Response) {
  //make api call and update the ui
  let cityplaceholder = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let temp = Math.round(Response.data.temperature.current);
  temperature.innerHTML = `${temp}°C`;
  let conditions = document.querySelector("#conditions");
  let weathercondition = Response.data.condition.description;
  //wind
  let wind = document.querySelector(".hello-wind");
  let windspeed = Response.data.wind.speed;
  //humidity
  let humidity = document.querySelector(".percent");
  let currenthumidity = Response.data.temperature.humidity;
  //time
  let date = new Date(Response.data.time * 1000);

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formattDate(date);
  let icon = document.querySelector("#icon");

  let iconImage = `  <img src="${Response.data.condition.icon_url}" class="weather-app-icon" />`;
  icon.innerHTML = iconImage;
  humidity.innerHTML = `${currenthumidity} %`;
  wind.innerHTML = `${windspeed} km/h`;
  conditions.innerHTML = weathercondition;
  cityplaceholder.innerHTML = Response.data.city;
  getforecast(Response.data.city);
}
//function format date
function formattDate(date) {
  let day = date.getDay();
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  day = days[day];
  return `${day}  ${hour}: ${minutes}`;
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

searchCity("lilongwe");

//get forecast from the API
function getforecast(city) {
  let apiurl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiurl).then(displayforecast);
}
function formatday(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
  return days[date.getDay()];
}
//forecast code
function displayforecast(Response) {
  console.log(Response.data);
  let weatherforcast = document.querySelector("#weather-forecast");

  let forecasthtml = "";
  Response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecasthtml =
        forecasthtml +
        `        <div class="column">
          <div class="forcast-day">${formatday(day.time)}</div>
          <div class="forcast-icon">
            <img
              src="${day.condition.icon_url}"
              alt=""
              style="width: 40px; height: 40px"
            />
          </div>
          <div class="forecast-temperature">
            <strong class="forecast-current-temperature"> ${Math.round(
              day.temperature.maximum
            )}º </strong>
            <span class="forecast-minimum-temperature"> ${Math.round(
              day.temperature.minimum
            )}º </span>
          </div>
        </div>`;
    }
  });
  weatherforcast.innerHTML = forecasthtml;
}

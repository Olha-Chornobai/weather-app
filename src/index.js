let now = new Date();
let currentDate = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  currentDate.innerHTML = `${day}, 0${hours}:${minutes}`;
} 
if (minutes < 10) {
  currentDate.innerHTML = `${day}, ${hours}:0${minutes}`;
} else {
  currentDate.innerHTML = `${day}, ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
  } else {
    h2.innerHTML = null;
    alert("Please, type a city");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempa");
  temperatureElement.innerHTML = 30;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempa");
  temperatureElement.innerHTML = -1;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);




function displayWeather(response) {
// console.log(response.data);


  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#tempa").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}


function searchCity(city) {
  let apiKey = "559c028ba95b5d267bf7ba088c6cb5d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}







function searchLocation(position) {
  let apiKey = "559c028ba95b5d267bf7ba088c6cb5d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
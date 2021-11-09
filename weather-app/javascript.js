// display current date and time
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = new Date();
let currentHour = date.getHours();
let currentMinute = date.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let currentDay = days[date.getDay()];
let currentTime = `${currentDay}, ${currentHour}:${currentMinute}`;
let replaceDate = document.querySelector("#dateTime");
replaceDate.innerHTML = currentTime;

// add a search engine
//function searchCity(event) {
//event.preventDefault();
// let input = document.querySelector("#formControl");
// let h1 = document.querySelector("#currentCity");
// h1.innerHTML = `${input.value}`;
//}

//let searching = document.querySelector("#submit-city");
//searching.addEventListener("submit", searchCity);

//C|F
function convertToFahrenheit(event) {
  event.preventDefault();
  let celsius = 17;
  let fahrenheit = Math.round(celsius * 1.8 + 32);
  let temperature = document.querySelector("span.current-degree");
  temperature.innerHTML = `${fahrenheit}°F`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsius = 17;
  let temperature = document.querySelector("span.current-degree");
  temperature.innerHTML = `${celsius}°C`;
}

let toFahrenheit = document.querySelector("#fahrenheit-link");
toFahrenheit.addEventListener("click", convertToFahrenheit);

let toCelsius = document.querySelector("#celsius-link");
toCelsius.addEventListener("click", convertToCelsius);

//temp of the city

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#formControl");
  let h1 = document.querySelector("#currentCity");
  h1.innerHTML = `${input.value}`;
  let apiKey = "190fc8cdbe26108a4daf6fa89fbfbee2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let searching = document.querySelector("#submit-city");
searching.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log(response.data.main);
  let temperature = document.querySelector("#changeTemp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C `;
}

//geolocation

function updateTemp(response) {
  let changeTemp = document.querySelector("#changeTemp");
  changeTemp.innerHTML = `${Math.round(response.data.main.temp)}°C `;
}

function currentWeather(response) {
  let searchedCity = document.querySelector("#currentCity");
  searchedCity.innerHTML = response.data.name;
  updateTemp(response);
}

function searchCurrentCity(position) {
  let apiKey = "190fc8cdbe26108a4daf6fa89fbfbee2";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}

function useCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

let findLocation = document.querySelector("#current");

findLocation.addEventListener("click", useCurrentLocation);

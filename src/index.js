function updateCityName(city) {
  let location = document.querySelector("#location");
  location.innerHTML = city;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function showTemperature(response) {
  console.log(response);
  let currentTemp = document.querySelector("#current-temp");
  let roundedTemp = Math.round(celsiusTemperature);
  currentTemp.innerHTML = `${roundedTemp}°C`;
  updateCityName(response.data.name);
  let iconElement = document.querySelector("#icon");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind-speed");
  let precipitation = document.querySelector("#precipitation");
  let smallIcons = document.querySelectorAll(".small-icons");

  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`, alt=description);
  smallIcons.setAttribute("src", `https://openweathermap.org/img/wn/10d@2x.png`);

  celsiusTemperature = response.data.main.temp;
  description.innerHTML = `Currently: ${response.data.weather[0].description}`;
  windSpeed.innerHTML = `Wind speed: ${response.data.wind.speed}km/h`;
  precipitation.innerHTML = `Humidity: ${response.data.main.humidity}%`;

}

function searchCity(city) {
  let apiId = "d547f7175aa4839fd00918dad2121b28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=524901&appid=${apiId}&units=metric`;
  let requestUrl = apiUrl + `&q=${city}`;
  axios.get(requestUrl).then(showTemperature);
}


function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiId = "d547f7175aa4839fd00918dad2121b28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=524901&appid=${apiId}&units=metric`;
  let requestUrl = apiUrl + `&lat=${latitude}&lon=${longitude}`;
  axios.get(requestUrl).then(showTemperature);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function updateCurrentTime() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayOfWeek = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hours = `0${hours}`; 
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  document.querySelector(".current-time").innerHTML = `Last updated:  ${dayOfWeek}, ${hour}:${minute}`;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}
let celsiusTemperature = null;


document.querySelector("#show-current").addEventListener("click", showCurrentLocation);
document.querySelector("#search-form").addEventListener("submit", showCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("London");
updateCurrentTime();
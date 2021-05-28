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
  let roundedTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${roundedTemp}°C`;
  updateCityName(response.data.name);
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/10d@2x.png`);
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

  document.querySelector(".current-time").innerHTML = `Currently it is  ${dayOfWeek}, ${hour}:${minute}`;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (14 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

searchCity("London");
updateCurrentTime();

document.querySelector("#show-current").addEventListener("click", showCurrentLocation);
document.querySelector("#search-form").addEventListener("submit", showCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
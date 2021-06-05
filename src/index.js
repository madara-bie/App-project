function updateCityName(city) {
  let location = document.querySelector("#location");
  location.innerHTML = city;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let maxTemp = forecastDay.temp.max;
  let minTemp = forecastDay.temp.min;
  if (maxTemp > 0) {
    maxTemp.innerHTML = `+${forecastDay.temp.max}`;
  }
  if (maxTemp < 0) {
    maxTemp.innerHTML = `-${forecastDay.temp.max}`;
  }
  if (minTemp > 0) {
    maxTemp.innerHTML = `+${forecastDay.temp.min}`;
  }
  if (maxTemp < 0) {
    minTemp.innerHTML = `-${forecastDay.temp.min}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML + `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="../icons/${forecastDay.weather[0].icon}.png" alt="" class="small-icons">
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-max">
              ${Math.round(maxTemp)}°
            </span>
            <span class="weather-forecast-min">
              ${Math.round(minTemp)}°
            </span>
        </div>
      </div>`;
    }
  });
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiId = "d547f7175aa4839fd00918dad2121b28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiId}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let currentTemp = document.querySelector("#current-temp");
  let temperatureElement = Math.round(celsiusTemperature);
  if (celsiusTemperature > 0) {
    currentTemp.innerHTML = `+${temperatureElement}°C`;
  }
  if (celsiusTemperature < 0) {
    currentTemp.innerHTML = `-${temperatureElement}°C`;
  }
  //currentTemp.innerHTML = `${temperatureElement}°C`;
  let iconElement = document.querySelector("#icon");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind-speed");
  let precipitation = document.querySelector("#precipitation");
  updateCityName(response.data.name);
  iconElement.setAttribute("src", `../icons/icons-big/${response.data.weather[0].icon}.png`, alt = description);
  description.innerHTML = `Currently: ${response.data.weather[0].description}`;
  windSpeed.innerHTML = `Wind speed: ${response.data.wind.speed}m/s`;
  precipitation.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  getForecast(response.data.coord);
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
    hour = `0${hour}`;
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  document.querySelector(".current-time").innerHTML = `Last updated: ${dayOfWeek}, ${hour}:${minute}`;
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
  if (celsiusTemperature > 0) {
    temperatureElement.innerHTML = `+${Math.round(celsiusTemperature)}°C`;
  }
  if (celsiusTemperature < 0) {
    temperatureElement.innerHTML = `-${Math.round(celsiusTemperature)}°C`;
  }
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
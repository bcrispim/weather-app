function formatDate(timestamp) {
    let date = new Date(timestamp);

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];
    return `Last updated at: ${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}h`;
}

function dispalyForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon
            }@2x.png"
      />
      <div class="weather-forecast">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
    }
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    searchInput.value = searchInput.value.toUpperCase();
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${searchInput.value}`;
    let city = document.getElementsByTagName('h1')[0].innerHTML;
    let key = "89418832a1183f5a7d963909563efc4b";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url).then(displayWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
    axios.get(apiUrl).then(dispalyForecast);
}

function displayWeather(response) {
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
    document.querySelector("#wind-speed").innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    document.querySelector("#main-icon").setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    var unixTimestamp = response.data.sys.sunrise
    var millisecond = unixTimestamp * 1000
    var dateObject = new Date(millisecond)
    var humanDateFormat = dateObject.toLocaleString()
    var hours = dateObject.toLocaleTimeString("pt-PT", { hour: "numeric" })
    var minutes = dateObject.toLocaleTimeString("pt-PT", { minute: "numeric" })
    if (minutes < 10) {
        minutes = '0' + minutes
    }

    document.querySelector("#sunrise").innerHTML = hours + ':' + minutes + 'h'

    var unixTimestamp = response.data.sys.sunset
    var millisecond = unixTimestamp * 1000
    var dateObject = new Date(millisecond)
    var humanDateFormat = dateObject.toLocaleString()
    var hours = dateObject.toLocaleTimeString("pt-PT", { hour: "numeric" })
    var minutes = dateObject.toLocaleTimeString("pt-PT", { minute: "numeric" })
    if (minutes < 10) {
        minutes = '0' + minutes
    }

    document.querySelector("#sunset").innerHTML = hours + ':' + minutes + 'h'
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function clickFarenheit(event) {
    event.preventDefault();
    document.querySelector("#temperature").innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let clickInputFarenheit = document.querySelector("#fahrenheit-link");
clickInputFarenheit.addEventListener("click", clickFarenheit);

function clickCelsius(event) {
    event.preventDefault();
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
}

let clickInputCelsius = document.querySelector("#celsius-link");
clickInputCelsius.addEventListener("click", clickCelsius);

let celsiusTemperature = null;

/*Default City*/

let city = document.getElementsByTagName('h1')[0].innerHTML;
let key = "89418832a1183f5a7d963909563efc4b";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

axios.get(url).then(displayWeather);
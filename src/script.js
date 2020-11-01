function formatDate(date) {

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let dayIndex = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dayIndex];

    return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


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
}

function displayWeather(response) {
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);

    var unixTimestamp = response.data.sys.sunrise
    var millisecond = unixTimestamp * 1000
    var dateObject = new Date(millisecond)
    var humanDateFormat = dateObject.toLocaleString()
    var hours = dateObject.toLocaleTimeString("pt-PT", { hour: "numeric" })
    var minutes = dateObject.toLocaleTimeString("pt-PT", { minute: "numeric" })
    if (minutes < 10) {
        minutes = '0' + minutes
    }

    document.querySelector("#sunrise").innerHTML = hours + ':' + minutes

    var unixTimestamp = response.data.sys.sunset
    var millisecond = unixTimestamp * 1000
    var dateObject = new Date(millisecond)
    var humanDateFormat = dateObject.toLocaleString()
    var hours = dateObject.toLocaleTimeString("pt-PT", { hour: "numeric" })
    var minutes = dateObject.toLocaleTimeString("pt-PT", { minute: "numeric" })
    if (minutes < 10) {
        minutes = '0' + minutes
    }

    document.querySelector("#sunset").innerHTML = hours + ':' + minutes
}

let city = document.getElementsByTagName('h1')[0].innerHTML;
let key = "89418832a1183f5a7d963909563efc4b";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

axios.get(url).then(displayWeather);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function clickFarenheit(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(22 * 1.8 + 32);
}

let clickInputFarenheit = document.querySelector("#fahrenheit-link");
clickInputFarenheit.addEventListener("click", clickFarenheit);

function clickCelsius(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = 22;
}

let clickInputCelsius = document.querySelector("#celsius-link");
clickInputCelsius.addEventListener("click", clickCelsius);

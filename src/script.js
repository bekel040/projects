let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// let info = prompt("Enter a city?");
// let flag = false;
// for (val in weather) {
//   if (weather[val] === weather[info]) {
//     let tempreture = weather[info].temp;
//     let humidity = weather[info].humidity;

//     alert(
//       `It is currently ${tempreture}° in ${info} with a humidity of ${humidity}%`
//     );
//     flag = true;
//   }
// }
// if (flag == false) {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${info}`
//   );
// }
let now = new Date();
//let currentDate = " ";
function formatDate(new_Date) {
  let day_array = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = day_array[new_Date.getDay()];
  let time = now.getHours() + ":" + now.getMinutes();
  let currentDate = `Today is ${day}, ${time}`;
  return currentDate;
}

let todaysDate = document.querySelector("h3.date");
todaysDate.innerHTML = formatDate(now);

//celsuis to farenheit

function convertFahrenheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#temp");
  let num = farenheit.innerHTML;

  let celsuis = (parseInt(num) - 32) * (5 / 9);

  farenheit.innerHTML = Math.ceil(celsuis) + "°";
}
function convertCelsuis(event) {
  event.preventDefault();
  let celsuis = document.querySelector("#temp");
  let num = celsuis.innerHTML;

  let farenheit = parseInt(num) * (9 / 5) + 32;

  celsuis.innerHTML = Math.ceil(farenheit) + "°";
}

let Ftemp = document.querySelector("#celsuis");

Ftemp.addEventListener("click", convertFahrenheit);

let Ctemp = document.querySelector("#fahrenheit");
Ctemp.addEventListener("click", convertCelsuis);

// API

function showTemp(response) {
  console.log(response.data);
  let tempShown = document.querySelector("#temp");
  let newTemp = Math.round(response.data.main.temp);
  tempShown.innerHTML = `${newTemp}°`;
  let description = document.querySelector(".sub-script");
  description.innerHTML = response.data.weather[0].description;
}

function citySearched(event) {
  event.preventDefault();
  let answer = document.querySelector("#search-result");
  let searchedCity = document.querySelector("h2.city");

  searchedCity.innerHTML = answer.value;
  let city = answer.value;
  let apiKey = "17b8b42d8d8c1de378970a3709bfd5c6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
let city = document.querySelector("#city-search");
city.addEventListener("submit", citySearched);

// get geolocation
function currentTemp(response) {
  console.log(response.data);
  let tempShown = document.querySelector("#temp");
  let newTemp = Math.round(response.data.main.temp);
  tempShown.innerHTML = `${newTemp}°`;
  let cityShown = document.querySelector("h2.city");
  cityShown.innerHTML = response.data.name;
  let description = document.querySelector(".sub-script");
  description.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "17b8b42d8d8c1de378970a3709bfd5c6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(currentTemp);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(showPosition)
);

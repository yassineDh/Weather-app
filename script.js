/*
//openweathermap API

const API_URL_WEATHER = "api.openweathermap.org/data/2.5/weather";
const API_KEY_WEATHER = "1820b7133328184533ffa4f63cc7999b";
const API_UNIT_WEATHER = "metric";

// giphy API

const API_URL_GIPHY = "api.giphy.com/v1/gifs/search";
const API_KEY_GYPHY = "lM9rDakqzv4UO9MgYDtPgiGqb17iDhGM";

let inp = document.getElementById("cityInput");
let cityInfo = document.getElementById("infos");
let cityLoading = document.getElementById("loader");

async function myFunction() {
  if (cityInfo.hasChildNodes()) {
    cityInfo.removeChild(cityInfo.childNodes[0]);
  }
  cityLoading.style.display = "block";
  let cityWeather = await getCityWeather(inp.value);
  inp.value = "";
  cityLoading.style.display = "none";

  if (cityWeather.cod == 404) {
    displayWeatherError();
    return;
  } else {
    displayWeatherInfo(cityWeather);
    getGiphyWeather(cityWeather.weather[0].description);
  }
}

async function getCityWeather(city) {
  let objWeather = await fetch(
    "https://" +
      API_URL_WEATHER +
      "?q=" +
      city +
      "&appid=" +
      API_KEY_WEATHER +
      "&units=" +
      API_UNIT_WEATHER,
    { mode: "cors" }
  );

  let resJs = await objWeather.json();

  return resJs;
}

async function getGiphyWeather(env) {
  let objGiphy = await fetch(
    "https://" + API_URL_GIPHY + "?q=" + env + "&api_key=" + API_KEY_GYPHY,
    { mode: "cors" }
  );

  let resJs = await objGiphy.json();
  let resURL = await resJs.data[0].images.original.url;
  document.body.style.backgroundImage = `url(${resURL})`;

  //   return resURL;
}

function displayWeatherInfo(obj) {
  let cityInfoIn = document.createElement("div");
  //create first row
  let row1 = document.createElement("div");
  row1.style.display = "flex";

  let labelCityName = document.createElement("p");
  labelCityName.innerText = "City : ";
  row1.appendChild(labelCityName);

  let nameCity = document.createElement("p");
  nameCity.innerText = obj.name;
  row1.appendChild(nameCity);

  //create second row
  let row2 = document.createElement("div");

  row2.style.display = "flex";
  let labelCityTemp = document.createElement("p");
  labelCityTemp.innerText = "Temperature : ";
  row2.appendChild(labelCityTemp);

  let tempCity = document.createElement("p");
  tempCity.innerText = obj.main.temp;
  row2.appendChild(tempCity);

  cityInfoIn.appendChild(row1);
  cityInfoIn.appendChild(row2);

  cityInfo.appendChild(cityInfoIn);
}

function displayWeatherError() {
  document.body.style.backgroundImage = "none";
  let errorMessage = document.createElement("p");
  errorMessage.innerText = "City not found , please verify the input.";
  cityInfo.appendChild(errorMessage);
}
*/

//openweathermap API

const API_URL_WEATHER = "api.openweathermap.org/data/2.5/weather";
const API_KEY_WEATHER = "1820b7133328184533ffa4f63cc7999b";
const API_UNIT_WEATHER = "metric";


let cities = [["casablanca",33.5731,-7.5898],["rabat",33.9716,-6.8498],["fes",34.0181,-5.0078]]

var map = L.map("map").setView([33.5731, -7.5898], 9);
let mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; " + mapLink + " Contributors",
  maxZoom: 18,
}).addTo(map);

cities.forEach(city => {
  let marker = L.marker([city[1], city[2]], {testAttr : city[0]})
  .addTo(map)
  .bindPopup("Loading...")
  .on("click", onMarkerClick);
});




async function onMarkerClick(e) {
  let popup = e.target.getPopup();
  let cityName = e.target.options.testAttr;
  let cityInfoIn = document.createElement("div");
  cityInfoIn.id= "inPopUp";
  let cityWeather = await getCityWeather(cityName);
  displayWeatherInfo(cityWeather,cityInfoIn) 

  
   popup.setContent(cityInfoIn);
}


async function getCityWeather(city) {
  let objWeather = await fetch(
    "https://" +
      API_URL_WEATHER +
      "?q=" +
      city +
      "&appid=" +
      API_KEY_WEATHER +
      "&units=" +
      API_UNIT_WEATHER,
    { mode: "cors" }
  );

  let resJs = await objWeather.json();

  return resJs;
}

function displayWeatherInfo(obj,cityInfoIn) {
  //create first row
  let row1 = document.createElement("div");
  row1.style.display = "flex";

  let labelCityName = document.createElement("p");
  labelCityName.innerText = "City : ";
  row1.appendChild(labelCityName);

  let nameCity = document.createElement("p");
  nameCity.innerText = obj.name;
  row1.appendChild(nameCity);

  //create second row
  let row2 = document.createElement("div");

  row2.style.display = "flex";
  let labelCityTemp = document.createElement("p");
  labelCityTemp.innerText = "Temperature : ";
  row2.appendChild(labelCityTemp);

  let tempCity = document.createElement("p");
  tempCity.innerText = obj.main.temp;
  row2.appendChild(tempCity);

  cityInfoIn.appendChild(row1);
  cityInfoIn.appendChild(row2);

}

import WeatherService from "../services/weather-service.js";
import store from "../store.js";

//NOTE The weather service and controller are mostly done,
//		you may wish to check out the model and include some additional data.

let clock;
let clockReadOut = "12"
let tempReadOut = "F"

//TODO Complete rendering data to the screen
function _drawWeather() {
  let weather = store.State.weather;
  if (tempReadOut == "K") {
    document.getElementById("weather").innerHTML = weather.TemplateK;
  } else if (tempReadOut == "C") {
    document.getElementById("weather").innerHTML = weather.TemplateC;
  } else {
    document.getElementById("weather").innerHTML = weather.TemplateF;
  }
}

function _drawClock(str) {
  let currTime = new Date();
  let ampm = ""
  let day = convertDay(currTime.getDay());
  let clockElem = document.getElementById("clock");
  let hour = currTime.getHours();
  if (str == "12") {
    ampm = hour < 12 ? " AM" : " PM";
    hour = ((hour > 12) ? hour - 12 : (hour == 0) ? 12 : hour);
  }
  let minutes = currTime.getMinutes();
  if (minutes < 10) { minutes = "0" + minutes };
  let seconds = currTime.getSeconds();
  if (seconds < 10) { seconds = "0" + seconds };
  clockElem.innerText = day + hour + ":" + minutes + ":" + seconds + ampm;
  clock = setTimeout(_drawClock, 1000, clockReadOut);
}

function convertDay(day) {
  switch (day) {
    case 0:
      return "Sunday "
    case 1:
      return "Monday "
    case 2:
      return "Tuesday "
    case 3:
      return "Wednesday "
    case 4:
      return "Thursday "
    case 5:
      return "Friday "
    case 6:
      return "Saturday"
    default:
      console.error("invalid day of week");
  }
}

function _getNextReadOut() {
  switch (tempReadOut) {
    case "K":
      return "C"
    case "C":
      return "F"
    case "F":
      return "K"
    default:
      console.error("invalid tempReadOut");
  }
}

export default class WeatherController {
  constructor() {
    store.subscribe("weather", _drawWeather);
    WeatherService.getWeather();
    _drawClock(clockReadOut);
  }
  toggleClock() {
    clearTimeout(clock);
    clockReadOut = (clockReadOut == "12") ? "24" : "12";
    _drawClock(clockReadOut);
  }
  toggleTemp() {
    tempReadOut = _getNextReadOut();
    _drawWeather();
  }
}

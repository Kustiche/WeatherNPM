import { forecast, degreeNow, degreeFelt, detailHumidity, detailSunrise, detailSunset, detailWind, cityOutput, search, img } from "./view.js";
import { cleaningForecastArray, forecastArray } from "./forecastArray.js";
import { createForecastElements } from "./createForecastElements.js";
import moment from "moment";

let serverUrl = '';
const apiKey = '44c1a218aa3a304cad0f0d8be43fa9fb';

export async function weatherAPI(cityName) {
  serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
  let response = '';

  try {
    response = await fetch(url);
    if (response.status === 404) {
      throw new Error('Такого города нет!');
    };
  } catch {
    window.modalError.showModal();
    cityOutput.textContent = '';
    search.value = '';
  };

    const data = await response.json();
    const {main: {temp, feels_like, humidity}, sys: {sunset, sunrise}, weather: [{main, icon}], wind: {speed}} = data;
    const secondsSunset = new Date(sunset * 1000);
    const secondsSunrise = new Date(sunrise * 1000);

    forecast.textContent = main;
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    degreeNow.textContent = Math.round(temp+ - 273);
    degreeFelt.textContent = Math.round(feels_like+ - 273);
    detailHumidity.textContent = humidity + '%';

    detailSunset.textContent = moment(secondsSunset).format('kk:mm');
    detailSunrise.textContent = moment(secondsSunrise).format('kk:mm');
    detailWind.textContent = speed + 'km/h';
};

export async function forecastAPI(cityName) {
  serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  cleaningForecastArray();

  const {list: [...information]} = data;

  for (let index = 0; index < 8; index++) {
    forecastArray.push(information[index]);
  };

  createForecastElements(cityName);

}
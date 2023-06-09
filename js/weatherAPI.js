import { forecast, degreeNow, degreeFelt, detailHumidity, detailSunrise, detailSunset, detailWind, cityOutput, search, img } from "./view.js";
import { cleaningForecastArray, forecastArray } from "./forecastArray.js";
import { createForecastElements } from "./createForecastElements.js";
import moment from "moment";

let serverUrl = '';
const apiKey = '44c1a218aa3a304cad0f0d8be43fa9fb';

export function weatherAPI(cityName) {
  serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const {main: {...mainInformation}, sys: {...sysInformation}, weather: [{main}], wind: {speed}} = data;
      const secondsSunset = new Date(sysInformation.sunset * 1000);
      const secondsSunrise = new Date(sysInformation.sunrise * 1000);

      forecast.textContent = main;

      if (main === 'Clouds') {
        img.src = 'https://openweathermap.org/img/wn/03d@2x.png';
      }else if(main === 'Rain') {
        img.src = 'https://openweathermap.org/img/wn/10d@2x.png';
      }else if(main === 'Clear') {
        img.src = 'https://openweathermap.org/img/wn/01d@2x.png';
      }else if(main === 'Mist') {
        img.src = 'https://openweathermap.org/img/wn/50d@2x.png';
      };

      degreeNow.textContent = Math.round(mainInformation.temp+ - 273);
      degreeFelt.textContent = Math.round(mainInformation.feels_like+ - 273);
      detailHumidity.textContent = mainInformation.humidity + '%';

      detailSunset.textContent = moment(secondsSunset).format('kk:mm');
      detailSunrise.textContent = moment(secondsSunrise).format('kk:mm');
      detailWind.textContent = speed + 'km/h';
    })
    .catch(() => {
      window.modalError.showModal();
      cityOutput.textContent = '';
      search.value = '';
    })
};

export function forecastAPI(cityName) {
  serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cleaningForecastArray();

      const {list: [...information]} = data;

      for (let index = 0; index < 8; index++) {
        forecastArray.push(information[index]);
      };

      createForecastElements(cityName);
    })

}
import { forecastTemplate, forecasts } from "./view.js";
import { forecastArray } from "./forecastArray.js";
import moment from "moment";

export function createForecastElements(cityName) {

  if (cityName === '') {
    return;
  }else {
    forecasts.textContent = '';

    for (let index = 0; index < 8; index++) {
      const {dt: dateTime, main: mainInformation, weather: [weatherInformation]} = forecastArray[index];
      const item = forecastTemplate.content.cloneNode(true);
      const dateTimeSeconds = new Date(dateTime * 1000);

      item.querySelector('.weather__date').textContent = moment(dateTimeSeconds).format('D MMM');
      item.querySelector('.weather__time').textContent = moment(dateTimeSeconds).format('kk:mm')
      item.querySelector('.weather__temperature').textContent = `Temperature: ${Math.round(mainInformation.temp+ -273)}`;
      item.querySelector('.weather__temperature--feels-like').textContent = `Feels like: ${Math.round(mainInformation.feels_like+ -273)}`;
      item.querySelector('.forecast-next-day').textContent = weatherInformation.main;

      if (weatherInformation.main === 'Clouds') {
        item.querySelector('.weather__forecast-img--next-day').src = 'https://openweathermap.org/img/wn/03d@2x.png';
      }else if(weatherInformation.main === 'Rain') {
        item.querySelector('.weather__forecast-img--next-day').src = 'https://openweathermap.org/img/wn/10d@2x.png';
      }else if(weatherInformation.main === 'Clear') {
        item.querySelector('.weather__forecast-img--next-day').src = 'https://openweathermap.org/img/wn/01d@2x.png';
      }else if(weatherInformation.main === 'Mist') {
        item.querySelector('.weather__forecast-img--next-day').src = 'https://openweathermap.org/img/wn/50d@2x.png';
      };

      forecasts.append(item);
    }
  }
}
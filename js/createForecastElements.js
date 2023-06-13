import { forecastTemplate, forecasts } from "./view.js";
import { forecastArray } from "./forecastArray.js";
import moment from "moment";

export function createForecastElements(cityName) {

  if (cityName === '') {
    return;
  }else {
    forecasts.textContent = '';

    for (let index = 0; index < 8; index++) {
      const {dt: dateTime, main: {temp, feels_like}, weather: [{main, icon}]} = forecastArray[index];
      const item = forecastTemplate.content.cloneNode(true);
      const dateTimeSeconds = new Date(dateTime * 1000);

      item.querySelector('.weather__date').textContent = moment(dateTimeSeconds).format('D MMM');
      item.querySelector('.weather__time').textContent = moment(dateTimeSeconds).format('kk:mm')
      item.querySelector('.weather__temperature').textContent = `Temperature: ${Math.round(temp+ -273)}`;
      item.querySelector('.weather__temperature--feels-like').textContent = `Feels like: ${Math.round(feels_like+ -273)}`;
      item.querySelector('.forecast-next-day').textContent = main;
      item.querySelector('.weather__forecast-img--next-day').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      forecasts.append(item);
    }
  }
}
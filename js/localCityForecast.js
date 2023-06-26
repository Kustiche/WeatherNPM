import { cityOutput} from "./view.js";
import { favoriteArray } from "./favoriteArray.js";
import { forecastAPI, weatherAPI } from "./weatherAPI.js";

export function localCityForecast(city) {
  const cityArray = favoriteArray.find((favorite) => favorite === city);

  if (cityArray === undefined) {
    if (city !== '') {
      weatherAPI(city);
      forecastAPI(city);
    }
  }else {
    cityOutput.textContent = cityArray.name;

    weatherAPI(cityArray)
    forecastAPI(cityArray)
  };
};
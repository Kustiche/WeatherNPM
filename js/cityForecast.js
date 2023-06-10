import { cityOutput } from "./view.js";
import { forecastAPI, weatherAPI } from "./weatherAPI.js";

export function cityForecast(e) {
  const isDesiredFavoriteBtn = e.target.className === 'weather__favorite-excerpt btn-reset';

  if (isDesiredFavoriteBtn) {
    const name = e.target.textContent;

    cityOutput.textContent = name;

    weatherAPI(name);

    forecastAPI(name);
  };
};
import { favoriteArray } from "./favoriteArray.js";
import { render } from "./render.js";
import { cityOutput } from "./view.js";


export function addFavoriteArray() {
  const cityName = cityOutput.textContent;
  const cityArray = favoriteArray.find((city) => city.name === cityName);

  if (cityArray === undefined) {
    favoriteArray.push({
      name: cityName
    });
  }

  localStorage.setItem('weather', JSON.stringify(favoriteArray));
  render();
}
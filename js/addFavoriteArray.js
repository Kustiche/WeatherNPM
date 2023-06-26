import { favoriteArray } from "./favoriteArray.js";
import { render } from "./render.js";
import { cityOutput } from "./view.js";


export function addFavoriteArray() {
  const cityName = cityOutput.textContent;
  const cityArray = favoriteArray.find((city) => city === cityName);

  if (cityArray === undefined) {
    favoriteArray.push(cityName);
  }else {
    window.modalFavoriteError.showModal();
  }

  localStorage.setItem('weather', JSON.stringify(favoriteArray));
  render();
}
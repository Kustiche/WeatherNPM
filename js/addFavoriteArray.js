import { favoriteArray } from "./favoriteArray.js";
import { render } from "./render.js";
import { cityOutput } from "./view.js";


export function addFavoriteArray() {
  const cityName = cityOutput.textContent;
  let cityArray = favoriteArray.has(cityName);

  if (cityArray === false) {
    favoriteArray.add(cityName);
  }else {
    window.modalFavoriteError.showModal();
  }

  localStorage.setItem('weather', JSON.stringify([...favoriteArray]));
  render();
}
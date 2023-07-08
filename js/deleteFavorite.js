import { favoriteArray } from "./favoriteArray.js";
import { render } from "./render.js";


export function deleteFavorite(e) {
  const isDesiredBtn = e.target.className === 'weather__favorite-btn btn-reset';

  if (isDesiredBtn) {
    const favorite = e.target.closest('.weather__favorite');
    const cityName = favorite.querySelector('.weather__favorite-excerpt');

    favoriteArray.forEach((item) => {
      if (item === cityName.textContent) {
        favoriteArray.delete(item);
      }
    })

    if (favoriteArray === {}) {
      localStorage.setItem('weather', JSON.stringify(null));
    }else {
      localStorage.setItem('weather', JSON.stringify([...favoriteArray]));
    };
    render()
  };
};
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import Swal from 'sweetalert2';

const Favorite = {
  async render() {
    return `
      <a href="#restoListFavorite" class="skip-link" tabindex="1">Skip to content</a>

      <resto-app-bar-heros id="appBarHeros"></resto-app-bar-heros>
      <resto-loading id="restoLoading"></resto-loading>  
      <resto-list id="restoListFavorite"></resto-list>
    `;
  },

  async afterRender() {
    const appBar = document.querySelector('#appBar');
    if (appBar) {
      appBar.setAttribute('tabindex', '2');
    }

    const skipLink = document.querySelector('.skip-link');
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      const restoListFavorite = document.querySelector('#restoListFavorite');
      if (restoListFavorite) {
        restoListFavorite.scrollIntoView({ behavior: 'smooth' });
      }
    });

    const loadingElement = document.querySelector('#restoLoading');
    const restaurantsContainer = document.querySelector('#restoListFavorite');

    const shadowRootHeros = document.querySelector('#appBarHeros');
    const headerTitle = shadowRootHeros.shadowRoot.querySelector('#headerTitle');
    const headerDesc = shadowRootHeros.shadowRoot.querySelector('#headerDesc');

    headerTitle.innerHTML = 'Restoran Favorit Anda';
    headerDesc.innerHTML = 'Jelajahi kembali restoran-restoran pilihan yang telah Anda simpan! Temukan pengalaman kuliner terbaik dan nikmati setiap momen dengan hidangan favorit Anda.';

    try {
      loadingElement.style.display = 'block';
      restaurantsContainer.style.display = 'none';

      const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();

      setTimeout(() => {
        const shadowRoot = restaurantsContainer.shadowRoot;
        const titleElement = shadowRoot.querySelector('#titleList');

        if (restaurants.length === 0) {
          titleElement.innerHTML = 'Tidak Ada Restoran Favorit';
        } else {
          titleElement.innerHTML = 'Restoran Favorit Anda';
        }

        restaurants.forEach((restaurant) => {
          const restoItem = document.createElement('resto-item');
          restoItem.restoData = restaurant;
          restaurantsContainer.appendChild(restoItem);
        });

        loadingElement.style.display = 'none';
        restaurantsContainer.style.display = 'block';
      }, 2000);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load favorite restaurants. Please try again later.',
      });

      console.error('Failed to load favorite restaurants:', error);

      loadingElement.style.display = 'none';
    }
  },
};

export default Favorite;

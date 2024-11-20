import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Favorite = {
  async render() {
    return `
      <resto-app-bar-heros id="appBarHeros"></resto-app-bar-heros>
      <resto-list id="restoList"></resto-list>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('#restoList');

    const shadowRootHeros = document.querySelector('#appBarHeros');
    const headerTitle = shadowRootHeros.shadowRoot.querySelector('#headerTitle');
    const headerDesc = shadowRootHeros.shadowRoot.querySelector('#headerDesc');

    headerTitle.innerHTML = 'Restoran Favorit Anda';
    headerDesc.innerHTML = 'Jelajahi kembali restoran-restoran pilihan yang telah Anda simpan! Temukan pengalaman kuliner terbaik dan nikmati setiap momen dengan hidangan favorit Anda.';

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
  },
};

export default Favorite;

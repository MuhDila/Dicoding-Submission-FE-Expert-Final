import RestaurantDbSource from '../../data/restaurantdb-source';

const ListRestaurants = {
  async render() {
    return `
      <resto-app-bar-heros></resto-app-bar-heros>
      <resto-opening></resto-opening>
      <resto-list id="resto-list"></resto-list>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.listRestaurants();
    const restaurantsContainer = document.querySelector('#resto-list');
    restaurants.forEach((restaurant) => {
      const restoItem = document.createElement('resto-item');
      restoItem.restoData = restaurant;
      restaurantsContainer.appendChild(restoItem);
    });
  },
};

export default ListRestaurants;

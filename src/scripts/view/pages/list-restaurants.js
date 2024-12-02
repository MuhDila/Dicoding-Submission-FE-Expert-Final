import RestaurantDbSource from '../../data/restaurantdb-source';
import Swal from 'sweetalert2';

const ListRestaurants = {
  async render() {
    return `
      <a href="#listRestaurantsList" class="skip-link" tabindex="1">Menuju ke konten</a>
      <resto-app-bar-heros></resto-app-bar-heros>
      <resto-opening></resto-opening>
      <resto-loading id="restoLoading"></resto-loading>
      <resto-list id="listRestaurantsList" style="display: none;"></resto-list>
    `;
  },

  async afterRender() {
    const loadingElement = document.querySelector('#restoLoading');
    const restaurantsContainer = document.querySelector('#listRestaurantsList');

    try {
      loadingElement.style.display = 'block';
      restaurantsContainer.style.display = 'none';

      const restaurants = await RestaurantDbSource.listRestaurants();

      setTimeout(() => {
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
        text: 'Failed to load list restaurants. Please try again later.',
      });

      console.error('Failed to load list restaurants:', error);

      loadingElement.style.display = 'none';
    }
  },
};

export default ListRestaurants;

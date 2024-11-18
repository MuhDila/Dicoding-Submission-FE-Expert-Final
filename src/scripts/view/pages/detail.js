import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';

const Detail = {
  async render() {
    return `
      <resto-detail id="resto-detail"></resto-detail>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantsContainer = document.querySelector('#resto-detail');
    restaurantsContainer.restoData = restaurant;
  },
};

export default Detail;
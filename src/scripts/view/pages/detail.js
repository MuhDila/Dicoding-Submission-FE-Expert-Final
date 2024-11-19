import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';

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

    const likeButtonContainer = restaurantsContainer.shadowRoot.querySelector('#likeButton');
    console.log(likeButtonContainer);

    LikeButtonInitiator.init({
      likeButtonContainer: likeButtonContainer,
      restaurant: restaurant,
    });
  },
};

export default Detail;
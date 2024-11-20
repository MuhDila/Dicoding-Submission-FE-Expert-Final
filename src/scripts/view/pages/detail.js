import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import Swal from 'sweetalert2';

const Detail = {
  async render() {
    return `
      <resto-loading id="restoLoading"></resto-loading>   
      <resto-detail id="restoDetail" style="display: none;"></resto-detail>
    `;
  },

  async afterRender() {
    const loadingElement = document.querySelector('#restoLoading');
    const detailElement = document.querySelector('#restoDetail');

    try {
      loadingElement.style.display = 'block';
      detailElement.style.display = 'none';

      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantDbSource.detailRestaurant(url.id);

      setTimeout(() => {
        detailElement.restoData = restaurant;

        const likeButtonContainer = detailElement.shadowRoot.querySelector('#likeButton');
        LikeButtonInitiator.init({
          likeButtonContainer: likeButtonContainer,
          restaurant: restaurant,
        });

        loadingElement.style.display = 'none';
        detailElement.style.display = 'block';
      }, 2000);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load detail restaurants. Please try again later.',
      });

      console.error('Failed to load detail restaurants:', error);

      loadingElement.style.display = 'none';
    }
  },
};

export default Detail;
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  const restoDetail = document.querySelector('#resto-detail');
  const shadowRoot = restoDetail.shadowRoot;

  await LikeButtonInitiator.init({
    likeButtonContainer: shadowRoot,
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };

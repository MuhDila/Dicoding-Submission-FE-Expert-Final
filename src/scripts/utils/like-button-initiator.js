import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer.shadowRoot || likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const movie = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!movie;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = `
      <img src="./images/heros/heart.svg" alt="Icon Like" id="imgButton">
    `;

    const likeButton = this._likeButtonContainer.querySelector('#imgButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = `
      <img src="./images/heros/heart-filled.svg" alt="Icon Liked" id="imgButton">
    `;

    const likeButton = this._likeButtonContainer.querySelector('#imgButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  }
};

export default LikeButtonInitiator;

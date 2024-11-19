import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer.shadowRoot || likeButtonContainer;  // Adjust if you're using shadowRoot
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
    <button id="likeButton" class="like-button">
      <span>Like</span>
    </button>
  `;

    const likeButton = this._likeButtonContainer.querySelector('#likeButton');  // Query inside the shadow DOM
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
        this._renderButton();
      });
    } else {
      console.error('Like button not found!');
    }
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = `
    <button id="likeButton" class="liked-button">
      <span>Liked</span>
    </button>
  `;

    const likeButton = this._likeButtonContainer.querySelector('#likeButton');  // Query inside the shadow DOM
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
        this._renderButton();
      });
    } else {
      console.error('Liked button not found!');
    }
  }
};

export default LikeButtonInitiator;

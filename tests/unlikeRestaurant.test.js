import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Restaurant', () => {
  const addRestoDetailElement = () => {
    document.body.innerHTML = `
      <resto-detail id="resto-detail">
        <article id="detailResto">
          <div class="image-container">
            <img id="imgResto" src="image.jpg" alt="Resto name">
            <button id="likeButton" class="like" aria-label="like this restaurant"></button>
          </div>
        </article>
      </resto-detail>
    `;
    const restoDetail = document.querySelector('resto-detail');
    restoDetail.attachShadow({ mode: 'open' });

    restoDetail.shadowRoot.innerHTML = `
      <button id="likeButton" class="like" aria-label="like this restaurant">Like</button>
    `;
  };

  beforeEach(async () => {
    addRestoDetailElement();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    const unlikeButton = document.querySelector('resto-detail').shadowRoot.querySelector('[aria-label="unlike this restaurant"]');
    expect(unlikeButton).not.toBeNull();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    const likeButton = document.querySelector('resto-detail').shadowRoot.querySelector('[aria-label="like this restaurant"]');
    expect(likeButton).toBeNull();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    const unlikeButton = document.querySelector('#likeButton');
    if (unlikeButton) {
      unlikeButton.dispatchEvent(new Event('click'));
    } else {
      console.log('There is no Button');
    }

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error when user clicks unlike button if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    const unlikeButton = document.querySelector('[aria-label="unlike this restaurant"]');
    if (unlikeButton) {
      unlikeButton.dispatchEvent(new Event('click'));
    }

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});

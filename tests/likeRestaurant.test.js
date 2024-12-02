import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
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
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    const likeButton = document.querySelector('resto-detail').shadowRoot.querySelector('[aria-label="like this restaurant"]');
    expect(likeButton).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    const unlikeButton = document.querySelector('resto-detail').shadowRoot.querySelector('[aria-label="unlike this restaurant"]');
    expect(unlikeButton).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    const likeButton = document.querySelector('#likeButton');
    likeButton.dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when it is already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const allRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    expect(allRestaurants).toEqual([{ id: 1 }]);

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});
    const likeButton = document.querySelector('#likeButton');
    likeButton.dispatchEvent(new Event('click'));

    const allRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    expect(allRestaurants).toEqual([]);
  });

});

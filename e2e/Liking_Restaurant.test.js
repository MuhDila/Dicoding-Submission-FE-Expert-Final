const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Liking Restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');
  I.waitForElement('#titleList', 5);
  I.see('Jelajahi Kedai Resto Kami', '#titleList');

  I.amOnPage('/');
  I.waitForElement('resto-item', 10);
  I.waitForElement('resto-item h3 a', 5);

  const firstRestaurantTitle = await I.grabTextFrom('resto-item h3 a:first-child');
  I.click(locate('resto-item h3 a:first-child'));

  I.waitForElement('#likeButton', 5);
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('resto-item', 5);
  const likedRestaurantTitle = await I.grabTextFrom('resto-item h3');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});


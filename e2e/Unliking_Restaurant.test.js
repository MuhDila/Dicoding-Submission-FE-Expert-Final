const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Unliking Restaurant', async ({ I }) => {
  // Step 1: Ensure there's a liked restaurant to unlike
  I.amOnPage('/');
  I.waitForElement('resto-item', 10);
  I.waitForElement('resto-item h3 a', 5);

  const firstRestaurantTitle = await I.grabTextFrom('resto-item h3 a:first-child');
  I.click(locate('resto-item h3 a:first-child'));

  I.waitForElement('#likeButton', 5);
  I.click('#likeButton'); // Like the restaurant

  // Step 2: Navigate to the favorites page and confirm the restaurant is there
  I.amOnPage('/#/favorite');
  I.waitForElement('resto-item', 5);
  const likedRestaurantTitle = await I.grabTextFrom('resto-item h3');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Step 3: Unlike the restaurant
  I.click(locate('resto-item h3 a:first-child')); // Click the liked restaurant to view details
  I.waitForElement('#likeButton', 5);
  I.click('#likeButton'); // Unlike the restaurant

  // Step 4: Confirm the restaurant is removed from the favorites page
  I.amOnPage('/#/favorite');
  I.wait(3); // Wait to ensure the UI updates
  I.dontSeeElement('resto-item'); // Ensure no restaurants are listed
});

const { expect } = require('chai');

Feature('Review Restaurant');

Before(({ I }) => {
  // Navigate to the homepage or the restaurant listing page
  I.amOnPage('/'); // Or the appropriate page where the list of restaurants is shown
});

Scenario('Review Restaurant', async ({ I }) => {
  // Step 1: Grab the name of the first restaurant from the list
  const firstRestaurantTitle = await I.grabTextFrom('resto-item h3'); // Assuming each restaurant is in a 'resto-item' with a 'h3' for the title

  // Step 2: Click on the first restaurant's link to go to the detail page
  I.click('resto-item a'); // Assuming each restaurant is clickable and inside an <a> tag within the 'resto-item'

  // Step 3: Wait for the detail page to load
  I.waitForElement('#restoDetail', 5); // Ensure the restaurant detail page is loaded

  // Step 4: Grab the restaurant name from the detail page and check if it matches
  const likedRestaurantTitle = await I.grabTextFrom('#restoDetail h3'); // Assuming the restaurant's name is in the 'h1' tag on the detail page
  expect(firstRestaurantTitle).to.equal(likedRestaurantTitle); // Ensure the restaurant title matches

  // Step 5: Open the review form
  I.seeElement('#buttonComment'); // Check if the "Write a Review" button exists
  I.click('#buttonComment'); // Click the "Write a Review" button to open the form

  // Step 6: Wait for the review form to be visible
  I.waitForElement('#restoReviewForm', 5); // Ensure the review form is visible

  // Step 7: Fill in the review form (name and description)
  I.fillField('#review-title', 'John Doe'); // Replace with the correct selector for the name input field
  I.fillField('#review_description', 'The food was amazing, highly recommend this place!'); // Replace with the correct selector for the description input field

  // Step 8: Submit the review
  I.click('#review-form button[type="submit"]'); // Replace with the correct submit button selector

  // Step 9: Check for a success message
  I.see('Your review has been successfully submitted.');
});

import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import Swal from 'sweetalert2';
import OpenReviewFormInitiator from '../../utils/comment-button-initiator';

const Detail = {
  async render() {
    return `
      <!-- Skip to content link -->
      <a href="#restoDetail" class="skip-link" tabindex="1">Skip to content</a>

      <resto-review-form id="restoReviewForm"></resto-review-form>
      <resto-loading id="restoLoading"></resto-loading>   
      <resto-detail id="restoDetail" style="display: none;"></resto-detail>
    `;
  },

  async afterRender() {
    const loadingElement = document.querySelector('#restoLoading');
    const detailElement = document.querySelector('#restoDetail');
    const reviewFormElement = document.querySelector('#restoReviewForm');

    const skipLink = document.querySelector('.skip-link');
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      const restoDetail = document.querySelector('#restoDetail');
      if (restoDetail) {
        restoDetail.scrollIntoView({ behavior: 'smooth' });
      }
    });

    try {
      loadingElement.style.display = 'block';
      detailElement.style.display = 'none';
      reviewFormElement.style.display = 'none';

      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await RestaurantDbSource.detailRestaurant(url.id);

      reviewFormElement.setAttribute('data-restaurant-id', url.id);

      setTimeout(() => {
        detailElement.restoData = restaurant;

        const likeButtonContainer = detailElement.shadowRoot.querySelector('#likeButton');
        LikeButtonInitiator.init({
          likeButtonContainer,
          restaurant,
        });

        const openReviewButton = detailElement.shadowRoot.querySelector('#buttonComment');
        const closeReviewButton = reviewFormElement.shadowRoot.querySelector('#close-dialog');

        OpenReviewFormInitiator.init({
          openForm: openReviewButton,
          closeForm: closeReviewButton,
          reviewFormElement,
        });

        reviewFormElement.shadowRoot
          .querySelector('#review-form')
          .addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = reviewFormElement.shadowRoot.querySelector('#review-title').value;
            const review = reviewFormElement.shadowRoot.querySelector('#review_description').value;

            try {
              await RestaurantDbSource.submitReview({ id: url.id, name, review });

              await Swal.fire({
                icon: 'success',
                title: 'Review Submitted!',
                text: 'Your review has been successfully submitted.',
              });

              reviewFormElement.shadowRoot.querySelector('#review-title').value = '';
              reviewFormElement.shadowRoot.querySelector('#review_description').value = '';

              reviewFormElement.style.display = 'none';

              const newReview = {
                name,
                review,
                date: new Date().toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }),
              };

              const reviewsContainer = detailElement.shadowRoot.querySelector('.customer-reviews');
              if (reviewsContainer) {
                const reviewHTML = `
                  <div class="review-card">
                    <h4>${newReview.name} <span class="date">${newReview.date}</span></h4>
                    <p>${newReview.review}</p>
                  </div>
                `;

                reviewsContainer.insertAdjacentHTML('beforeend', reviewHTML);
              }

            } catch (error) {
              Swal.close();
              await Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Could not submit your review. Please try again later.',
              });

              console.error('Failed to submit review:', error);
            }
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

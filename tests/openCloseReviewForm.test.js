import OpenReviewFormInitiator from '../src/scripts/utils/comment-button-initiator';

describe('Opening and Closing Review Form', () => {
  const addReviewFormElement = () => {
    document.body.innerHTML = `
      <resto-review-form id="restoReviewForm"></resto-review-form>
      <resto-detail id="restoDetail">
        <button id="buttonComment" aria-label="open review form">Open Review Form</button>
      </resto-detail>
    `;

    const restoDetail = document.querySelector('resto-detail');
    restoDetail.attachShadow({ mode: 'open' });

    restoDetail.shadowRoot.innerHTML = `
      <button id="buttonComment" aria-label="open review form">Open Review Form</button>
    `;

    const restoReviewForm = document.querySelector('#restoReviewForm');
    restoReviewForm.attachShadow({ mode: 'open' });

    restoReviewForm.shadowRoot.innerHTML = `
      <button id="close-dialog" aria-label="close review form">Close Review Form</button>
    `;
  };

  beforeEach(() => {
    addReviewFormElement();
  });

  it('should open the review form when the open review button is clicked', () => {
    const reviewFormElement = document.querySelector('#restoReviewForm');
    const openReviewButton = document.querySelector('#buttonComment');

    OpenReviewFormInitiator.init({
      openForm: openReviewButton,
      closeForm: reviewFormElement.shadowRoot.querySelector('#close-dialog'),
      reviewFormElement,
    });

    openReviewButton.click();

    expect(reviewFormElement.style.display).toBe('block');
  });

  it('should close the review form when the close review button is clicked', () => {
    const reviewFormElement = document.querySelector('#restoReviewForm');
    const openReviewButton = document.querySelector('#buttonComment');
    const closeReviewButton = reviewFormElement.shadowRoot.querySelector('#close-dialog');

    OpenReviewFormInitiator.init({
      openForm: openReviewButton,
      closeForm: closeReviewButton,
      reviewFormElement,
    });

    openReviewButton.click();

    expect(reviewFormElement.style.display).toBe('block');

    closeReviewButton.click();

    expect(reviewFormElement.style.display).toBe('none');
  });
});

const OpenReviewFormInitiator = {
  init({ openForm, closeForm, reviewFormElement }) {
    this._openForm = openForm;
    this._closeForm = closeForm;
    this._reviewFormElement = reviewFormElement;

    this._attachEvent();
  },

  _attachEvent() {
    this._openForm.addEventListener('click', () => {
      this._reviewFormElement.style.display = 'block';
    });

    this._closeForm.addEventListener('click', () => {
      this._reviewFormElement.style.display = 'none';
    });
  },
};

export default OpenReviewFormInitiator;
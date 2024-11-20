class RestoReviewForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      .dialog {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .dialog-content {
        background-color: #fff;
        margin: 10% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 8px;
      }

      .dialog-content h2 {
        font-size: 18px;
      }

      .dialog-content label {
        font-size: 14px;
      }

      .close-button {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .close-button:hover,
      .close-button:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }

      label {
        display: block;
        margin-top: 10px;
      }

      input[type="text"],
      textarea {
        width: 98%;
        padding: 8px;
        margin-top: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-family: 'SUSE', 'sans-serif';
      }

      p {
        margin-top: 8px;
        font-size: 14px;
        color: red;
      }

      #buttonSubmit {
        min-width: 44px;
        min-height: 44px;
        margin-top: 10px;
        background-color: #5d87ff;
        color: #fff;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-family: "Plus Jakarta Sans", sans-serif;
      }

      #buttonSubmit:hover {
        background-color: #5d81c1;
      }
      
      #close-dialog {
        min-width: 44px;
        min-height: 44px;
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        outline: none;
        box-shadow: none;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
    this._addValidationTitleListeners();
    this._addValidationDescriptionListeners();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div id="dialog" class="dialog">
        <div class="dialog-content">
          <button class="close-button" id="close-dialog">&times;</button>
          <h2>Add Review</h2>
          <form id="review-form">
            <label for="review-title">Name:</label>
            <input type="text" id="review-title" required minlength="3" pattern="[A-Za-z0-9\\s]+">
            <p id="validate-title"></p>
            <label for="review_description">Description:</label>
            <textarea id="review_description" rows="5" required></textarea>
            <p id="validate-description"></p>
            <button id="buttonSubmit" type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    `;
  }

  _addValidationTitleListeners() {
    const titleInput = this._shadowRoot.querySelector('#review-title');
    const validationMessage = this._shadowRoot.querySelector('#validate-title');

    titleInput.addEventListener('input', () => {
      validationMessage.innerText = '';

      if (titleInput.validity.valueMissing) {
        validationMessage.innerText = 'Title is required.';
      } else if (titleInput.validity.tooShort) {
        validationMessage.innerText = 'Title must be at least 1 character long.';
      } else if (titleInput.validity.patternMismatch) {
        validationMessage.innerText = 'Title must not contain special characters.';
      }
    });

    titleInput.addEventListener('invalid', (event) => {
      event.preventDefault();
      if (titleInput.validity.valueMissing) {
        validationMessage.innerText = 'Title is required.';
      } else if (titleInput.validity.tooShort) {
        validationMessage.innerText = 'Title must be at least 1 character long.';
      } else if (titleInput.validity.patternMismatch) {
        validationMessage.innerText = 'Title must not contain special characters.';
      }
    });
  }

  _addValidationDescriptionListeners() {
    const descriptionInput = this._shadowRoot.querySelector('#review_description');
    const validationMessage = this._shadowRoot.querySelector('#validate-description');

    descriptionInput.addEventListener('input', () => {
      validationMessage.innerText = '';

      if (descriptionInput.validity.valueMissing) {
        validationMessage.innerText = 'Description is required.';
      } else if (descriptionInput.validity.tooShort) {
        validationMessage.innerText = 'Description must be at least 10 characters long.';
      }
    });

    descriptionInput.addEventListener('invalid', (event) => {
      event.preventDefault();
      if (descriptionInput.validity.valueMissing) {
        validationMessage.innerText = 'Description is required.';
      } else if (descriptionInput.validity.tooShort) {
        validationMessage.innerText = 'Description must be at least 10 characters long.';
      }
    });
  }
}

customElements.define('resto-review-form', RestoReviewForm);

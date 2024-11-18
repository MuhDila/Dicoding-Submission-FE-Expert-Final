import CONFIG from '../../globals/config';

class RestoDetail extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _resto = {
    id: null,
    name: null,
    description: null,
    pictureId: null,
    city: null,
    rating: null
  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set restoData(value) {
    this._resto = value;
    this.render();
  }

  get restoData() {
    return this._resto;
  }

  _updateStyle() {
    this._style.textContent = `
      article {
        background-color: #fff;
        margin: 32px auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 16px;
        position: relative;
      }

      button#close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
      }

      .image-container {
        position: relative;
        max-width: 100%;
      }

      img {
        border-radius: 16px;
        width: 100%;
        display: block;
      }

      .info-container {
        position: absolute;
        bottom: 8px;
        left: 8px;
        display: inline-block;
        border-radius: 4px;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.6);
        color: #FFD700;
      }

      .rating {
        margin: 0;
      }
    `;
  }

  render() {
    this._updateStyle();

    const maxRating = 5;
    const filledStars = '★'.repeat(Math.floor(this._resto.rating));
    const emptyStars = '☆'.repeat(maxRating - Math.floor(this._resto.rating));

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div id="resto-detail">
        <article>
          <div class="image-container">
            <img src="${CONFIG.BASE_IMAGE_URL_MEDIUM + this._resto.pictureId}" alt="Resto ${this._resto.name}">
            <div class="info-container">
            <p class="rating">${filledStars}${emptyStars} (${this._resto.rating}) di ${this._resto.city}</p>
            </div>
          </div>
          <h3>${this._resto.name}</h3>
          <p>${this._resto.description}</p>
        </article>
      </div>
    `;
  }
}

customElements.define('resto-detail', RestoDetail);

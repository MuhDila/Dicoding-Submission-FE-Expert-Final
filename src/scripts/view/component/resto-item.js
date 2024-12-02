import CONFIG from '../../globals/config';

class RestoItem extends HTMLElement {
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

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
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
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    
    article {
      border-radius: 8px;
      border: 1px solid black;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
      background-color: #FFFFFF;
      overflow: hidden;
      transition: transform 0.2s ease-in-out;
      background-color: floralwhite;
    }
    
    article:hover, article:focus {
      cursor: pointer;
      transform: scale(1.01) translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    
    .image-container {
      position: relative;
      max-width: 100%;
    }

    img {
      width: 100%;
      display: block;
      border-bottom: 1px solid #ddd;
    }
    
    .rating {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background-color: rgba(0, 0, 0, 0.6);
      color: #FFD700;
      font-size: 1em;
      padding: 4px 8px;
      margin: 0;
      border-radius: 4px;
    }

    span, .city {
      display: block;
      text-align: justify;
      opacity: 80%;
      padding: 0 16px;
    }
    
    h3 {
      text-align: justify;
      margin-top: 8px;
      padding: 0 16px;
    }
    
    a {
      text-decoration: none;
      color: inherit;
      display: inline-block;
      min-width: 44px;  /* Set min width */
      min-height: 44px; /* Set min height */
      line-height: 44px; /* Vertically center text */
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    p {
      text-align: justify;
      padding: 0 16px;
      margin-bottom: 16px;
      margin-top: 8px;
      max-height: calc(5 * 1.5em);
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      line-height: 22px;
    }
  `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    const maxRating = 5;
    const filledStars = '★'.repeat(Math.floor(this._resto.rating));
    const emptyStars = '☆'.repeat(maxRating - Math.floor(this._resto.rating));

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="content-resto">
        <article tabindex="0">
          <div class="image-container">
            <img src="${CONFIG.BASE_IMAGE_URL.SMALL + this._resto.pictureId}" alt="Resto ${this._resto.name}">
            <p class="rating">${filledStars}${emptyStars} (${this._resto.rating}) di ${this._resto.city}</p>
          </div>
          <h3><a href="/#/detail/${this._resto.id}">${this._resto.name}</a></h3>
          <p>${this._resto.description}</p>
        </article>
      </div>
    `;
  }
}

customElements.define('resto-item', RestoItem);

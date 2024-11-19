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
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
    
      #resto-detail {
        background-color: #fff;
        margin: 32px auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 16px;
        position: relative;
      }

      h3 {
        margin: 16px auto;
      }
      
      hr {
        margin: 16px auto;
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
      
      ul {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        justify-content: center; /* Center grid items within slot */
        list-style-type: none;
        padding: 0;
      }
  
      li {
        display: flex;
        align-items: center;
        padding: 8px;
        margin: 4px;
        border: 1px solid #888;
        border-radius: 16px;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      li img {
        width: 16px;
        margin-right: 8px;
      }
      
      li:hover {
        cursor: pointer;
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
  
      .customer-reviews {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        justify-content: center; /* Center grid items within slot */
        list-style-type: none;
        padding: 0;
      }
      
      .review-card {
        padding: 8px;
        margin: 4px;
        border: 1px solid #888;
        border-radius: 16px;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .review-card:hover {
        cursor: pointer;
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      .review-card .date {
        font-weight: normal;
        font-color: gray;
        font-size: 12px;
      }
      
      .review-card h4 {
        margin-bottom: 8px;
      }
    `;
  }

  render() {
    this._updateStyle();

    const maxRating = 5;
    const filledStars = '★'.repeat(Math.floor(this._resto.rating));
    const emptyStars = '☆'.repeat(maxRating - Math.floor(this._resto.rating));

    const placeholderImageFood = './images/heros/paper-bag.svg';
    const foodList = this._resto.menus?.foods ? this._resto.menus.foods.map(
      (food) =>
        `<li>
          <img src="${placeholderImageFood}" alt="Food Icon"">
          ${food.name}
        </li>`
    ).join('') : '<li>No food available</li>';

    const placeholderImageDrink = './images/heros/cup.svg';
    const drinkList = this._resto.menus?.drinks ? this._resto.menus.drinks.map(
      (drink) =>
        `<li>
          <img src="${placeholderImageDrink}" alt="Drink Icon"">
          ${drink.name}
        </li>`
    ).join('') : '<li>No food available</li>';

    const customerReviews = this._resto.customerReviews
      ? this._resto.customerReviews
        .map((review) =>
          `<div class="review-card">
            <h4>${review.name} <span class="date">${review.date}</span></h4>
            <p>${review.review}</p>
          </div>`
        ).join('') : '<p>No customer reviews available.</p>';

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div id="resto-detail">
        <article id="detailResto">
          <div class="image-container">
            <img src="${CONFIG.BASE_IMAGE_URL_MEDIUM + this._resto.pictureId}" alt="Resto ${this._resto.name}">
            <div class="info-container">
            <p class="rating">${filledStars}${emptyStars} (${this._resto.rating}) di ${this._resto.city}</p>
            </div>
          </div>
          <h3>${this._resto.name}</h3>
          <p>${this._resto.description}</p>
        </article>
        <hr>
        <article id="foodMenu">
          <h3>Food Menu</h3>
          <ul>
            ${foodList}
          </ul>
        </article>
        <article id="drinkMenu">
          <h3>Drink Menu</h3>
          <ul>
            ${drinkList}
          </ul>
        </article>
        <hr>
        <article id="customerReviews">
        <h3>Customer Reviews</h3>
        <div class="customer-reviews">
          ${customerReviews}
        </div>
      </article>
      </div>
    `;
  }
}

customElements.define('resto-detail', RestoDetail);

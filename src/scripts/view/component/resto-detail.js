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
    address: null,
    rating: null,
    menus: {
      foods: [],
      drinks: [],
    },
    customerReviews: [],
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
        margin: 82px auto;
        padding: 20px;
        border: 1px solid #888;
        width: 90%;
        border-radius: 16px;
        position: relative;
      }

      #imgResto {
        width: 100%;
        border-radius: 8px;
      }

      h3 {
        margin: 16px auto;
      }
      
      hr {
        margin: 16px auto;
      }

      .image-container {
        position: relative;
        max-width: 100%;
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
      
      #likeButton {
        min-width: 44px;
        min-height: 44px;
        position: absolute;
        bottom: 8px;
        right: 8px;
        display: inline-block;
        border-radius: 4px;
        padding: 8px 16px;
        background-color: rgba(0, 0, 0, 0.6);
        color: #FFD700;
        border: none;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
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
      
      #hrReview {
        margin: 16px 0 0 0;
      }
      
      #reviewTitle {
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
      }
      
      #reviewTitle h3 {
        margin: 16px 0;
      }
      
      #buttonComment:hover {
        cursor: pointer;
      }
      
      #buttonComment {
        min-width: 44px;
        min-height: 44px;
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        outline: none;
        box-shadow: none;
      }
      
      #buttonComment:focus {
        border-radius: 8px;
        border: black 1px solid;
      }
      
      #buttonComment img {
        margin-top: 2px;
        width: 22px;
        height: 22px;
      }
      
      li:hover {
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
      
      @media screen and (max-width: 545px) {
        .image-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        #likeButton {
          position: static;
          align-self: center;
          margin-bottom: 8px;
        }
  
        .info-container {
          position: static;
          width: 100%;
          text-align: center;
        }
      }
    `;
  }

  render() {
    this._updateStyle();

    const maxRating = 5;
    const filledStars = '★'.repeat(Math.floor(this._resto.rating));
    const emptyStars = '☆'.repeat(maxRating - Math.floor(this._resto.rating));

    const placeholderImageFood = './svg/paper-bag.svg';
    const foodList = this._resto.menus?.foods ? this._resto.menus.foods.map(
      (food) =>
        `<li>
          <img src="${placeholderImageFood}" alt="Food Icon"">
          ${food.name}
        </li>`
    ).join('') : '<li>No food available</li>';

    const placeholderImageDrink = './svg/cup.svg';
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
            <img id="imgResto" src="${CONFIG.BASE_IMAGE_URL.SMALL + this._resto.pictureId}" alt="Resto ${this._resto.name}">
            <button id="likeButton" class="like">
              
            </button>
            <div class="info-container">
                <p class="rating">${filledStars}${emptyStars} (${this._resto.rating}) di ${this._resto.city} - ${this._resto.address}</p>
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
        <hr id="hrReview">
        <article id="customerReviews">
          <div id="reviewTitle">
            <h3>Customer Reviews</h3>
            <button id="buttonComment">
              <img src="./images/heros/message-plus.svg" alt="Icon Comment">
            </button>
          </div>
          <div class="customer-reviews">
            ${customerReviews}
          </div>
        </article>
      </div>
    `;
  }
}

customElements.define('resto-detail', RestoDetail);

class RestoOpening extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._updateStyle();
  }

  _updateStyle() {
    this._style.textContent = `
      * {
        padding: 0;
        margin: 0;
      }
      
      div article {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 16px;
      }
      
      h2 {
        font-size: 26px;
      }
      
      p {
        max-width: 1000px;
        font-size: 18px;
      }
        
      a {
        min-width: 44px;
      }  
      
      img {
        width: 1000px;
        height: 400px;
        object-fit: cover;
        object-position: bottom;
        border-radius: 15px;
      }
      
      @media screen and (max-width: 1200px) {
        img {
          width: 100%;
          height: 300px;
        }
        
        p {
          width: 90%;
        }
      }
      
      @media screen and (max-width: 760px) {
        p {
          text-align: justify;
        }
      }
      
      @media screen and (max-width: 650px) {
        img {
          height: 200px;
        }
    
        h1 {
          font-size: 20px;
        }
        
        p {
          font-size: 16px;
          text-align: justify;
          max-height: calc(5 * 1.5em);
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          line-height: 1.5em;
        }
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div id="content-opening">
        <article>
          <h2>Kenali Resto Kedai Kami</h2>
          <picture>
            <source media="(max-width: 600px)" srcset="./images/hero-image_1-small.jpg">
            <img src="./images/hero-image_1-large.jpg" alt="Brand Resto">
          </picture>
          <p>
            Kedai Resto Gatau Bingung adalah destinasi kuliner yang
            berkomitmen untuk memberikan pengalaman makan yang luar
            biasa. Dengan berbagai hidangan yang terinspirasi dari
            masakan lokal dan internasional. Setiap hidangan
            dirancang dengan cermat untuk menciptakan kombinasi rasa
            yang unik. Kami juga mengutamakan keberlanjutan dengan
            memilih bahan baku yang ramah lingkungan dan mendukung
            petani lokal. Mari bergabung bersama kami dan rasakan
            petualangan rasa yang tak terlupakan!
          </p>
        </article>
      </div>
    `;
  }
}

customElements.define('resto-opening', RestoOpening);

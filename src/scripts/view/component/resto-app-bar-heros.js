class RestoAppBarHeros extends HTMLElement {
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

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
      }

      .header-intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 16px 0;
        max-width: 1000px;
      }

      .header-intro h1 {
        font-size: 64px;
      }

      .header-intro p {
        font-size: 24px;
        max-width: 800px;
      }

      .header-intro a {
        font-size: 22px;
        color: black;
        text-decoration: underline;
      }

      @media screen and (max-width: 760px) {
        .header-intro h1 {
          font-size: 48px;
        }

        .header-intro p {
          font-size: 22px;
        }

        .header-intro a {
          font-size: 20px;
        }
      }

      @media screen and (max-width: 650px) {
        .header-intro {
          width: 90%;
        }

        .header-intro h1 {
          font-size: 32px;
        }

        .header-intro p {
          font-size: 18px;
        }

        .header-intro a {
          font-size: 16px;
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
      <div id="content-header">
        <article class="header-intro">
          <h1>Selamat Datang di Kedai Resto Gatau Bingung</h1>
          <p>Restoran yang menghadirkan pengalaman penuh kejutan, di mana setiap hidangan membawa petualangan rasa yang tak terduga.</p>
        </article>
      </div>    
    `;
  }
}

customElements.define('resto-app-bar-heros', RestoAppBarHeros);

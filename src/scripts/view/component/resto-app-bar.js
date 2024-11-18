class RestoAppBar extends HTMLElement {
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
        width: 100%;
      }

      nav {
        display: flex;
        position: fixed;
        top: 16px;
        z-index: 9999;
        padding: 16px;
        border-radius: 16px;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 64px;
        background-color: black;
      }

      ul, nav a {
        display: flex;
        gap: 18px;
      }

      a {
        color: white;
        text-decoration: none;
        min-width: 44px;
        min-height: 44px;
        justify-content: center;
        align-items: center;
      }

      a:hover {
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
      }

      article a:focus {
        outline: 1px solid black;
        padding: 4px;
        border-radius: 8px;
      }

      #hamburger, #close {
        display: none;
        min-width: 44px;
        min-height: 44px;
        justify-content: center;
        align-items: center;
      }

      @media screen and (max-width: 760px) {
        nav {
          width: 90%;
          justify-content: space-between;
        }
      }

      @media screen and (max-width: 650px) {
        nav {
          width: 90%;
          justify-content: space-between;
        }

        nav ul, nav a {
          display: none;
        }

        .visible ul, nav ul a {
          display: flex;
          padding: 1px;
        }

        .visible .icon-logo {
          display: none;
        }

        .visible #hamburger {
          display: none;
        }

        .show #close {
          display: flex;
        }

        #hamburger {
          display: flex;
        }

        button {
          display: flex;
          background: none;
          border: none;
          outline: none;
          box-shadow: none;
          color: white;
          font-size: 18px;
        }

        button:hover {
          cursor: pointer;
        }

        button:focus {
          outline: 1px solid white;
          border-radius: 4px;
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
        <nav id="drawer">
          <img class="icon-logo" src="./images/heros/logo-brand.svg" alt="Brand Logo">
          <button id="hamburger">☰</button>
          <ul id="drawerComponent">
            <li><a href="#">Home</a></li>
            <li><a href="#">Favorite</a></li>
            <li><a href="https://www.linkedin.com/in/muhammaddila/">About Us</a></li>
          </ul>
          <button id="close">🗙</button>
        </nav>
      </div>    
    `;
  }
}

customElements.define('resto-app-bar', RestoAppBar);

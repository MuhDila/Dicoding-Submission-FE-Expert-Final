class RestoFooter extends HTMLElement {
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
      div {
        bottom: 0;
        width: 100%;
        margin-top: 32px;
        text-align: center;
        background-color: black;
        color: white;
        padding: 8px 0;
      }
      
      img {
        max-height: 28px;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += ` 
      <div>
        <picture>
            <source media="(max-width: 600px)" srcset="./images/logo-brand-small.jpg">
            <img src="./images/logo-brand-large.jpg" alt="Brand Logo">
          </picture>
        <p>Create by Muhammad Dila, Dila was "Bingung" what he need to create, so Dila create "Gatau Bingung" so here
          "Gatau Bingung" website.</p>
        <p>Belajar Dasar Pemograman Web &#169; 2024, Dicoding Academy</p>
      </div> 
    `;
  }
}

customElements.define('resto-footer', RestoFooter);

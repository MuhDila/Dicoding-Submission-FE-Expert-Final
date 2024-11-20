class RestoLoading extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      #loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
  
      .loader {
        display: inline-block;
        box-sizing: border-box;
        width: 38px;
        height: 38px;
        border: 3px solid #fff;
        border-bottom-color: #5d87ff;
        border-radius: 50%;
        animation: rotation 1s linear infinite;
      }
  
      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div id="loader" class="text-center">
        <span class="loader"></span>
      </div>
    `;
  }
}

customElements.define('resto-loading', RestoLoading);

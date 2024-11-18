class RestoList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _column = 3;
  _gutter = 16;

  static get observedAttributes() {
    return ['column', 'gutter'];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
        margin: 0 auto;
        padding: 0 16px;
      }
      
      .list {
        text-align: center;
        margin: 0 32px;
      }

      slot {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: ${this._gutter}px;
        justify-content: center; /* Center grid items within slot */
      }
    `;
  }

  set column(value) {
    const newValue = Number(value);
    if (RestoList.isValidInteger(newValue)) {
      this._column = newValue;
    }
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    const newValue = Number(value);
    if (RestoList.isValidInteger(newValue)) {
      this._gutter = newValue;
    }
  }

  get gutter() {
    return this._gutter;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="list">
        <h2>Jelajahi Kedai Resto Kami</h2>
        <slot></slot>
      </div>
    `;
  }

  static isValidInteger(value) {
    return !Number.isNaN(value) && Number.isFinite(value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case 'column':
      this.column = newValue;
      break;
    case 'gutter':
      this.gutter = newValue;
      break;
    }
    this.render();
  }
}

customElements.define('resto-list', RestoList);

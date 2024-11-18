import 'regenerator-runtime';
import '../styles/main.scss';
import './view/component/index-component.js';
import App from './view/app.js';

const restoAppBar = document.querySelector('#appBar');

const app = new App({
  buttonHamburger: restoAppBar.shadowRoot.querySelector('#hamburger'),
  buttonClosed: restoAppBar.shadowRoot.querySelector('#close'),
  drawer: restoAppBar.shadowRoot.querySelector('#drawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

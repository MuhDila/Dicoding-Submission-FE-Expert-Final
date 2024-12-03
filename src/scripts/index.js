import 'regenerator-runtime';
import '../styles/main.scss';
import './view/component/index-component.js';
import App from './view/app.js';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const restoAppBar = document.querySelector('#appBar');

const app = new App({
  buttonHamburger: restoAppBar.shadowRoot.querySelector('#hamburger'),
  buttonClosed: restoAppBar.shadowRoot.querySelector('#close'),
  drawer: restoAppBar.shadowRoot.querySelector('#drawer'),
  content: document.querySelector('#mainContent'),
  logo: restoAppBar.shadowRoot.querySelector('#brand-logo'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

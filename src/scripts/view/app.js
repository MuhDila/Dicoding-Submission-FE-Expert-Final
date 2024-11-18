import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ buttonHamburger, buttonClosed, drawer, content }) {
    this._buttonHamburger = buttonHamburger;
    this._buttonClosed = buttonClosed;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      buttonHamburger: this._buttonHamburger,
      buttonClosed: this._buttonClosed,
      drawer: this._drawer,
      content: this._content,
    });

    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;

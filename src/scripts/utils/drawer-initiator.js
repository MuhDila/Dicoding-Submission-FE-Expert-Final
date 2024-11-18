const DrawerInitiator = {
  init({ buttonHamburger, buttonClosed, drawer, content }) {
    buttonHamburger.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    buttonClosed.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('visible');
    drawer.classList.toggle('show');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('visible');
    drawer.classList.remove('show');
  },
};

export default DrawerInitiator;

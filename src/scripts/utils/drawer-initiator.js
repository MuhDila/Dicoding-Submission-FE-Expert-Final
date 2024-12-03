const DrawerInitiator = {
  init({ buttonHamburger, buttonClosed, drawer, content, logo }) {
    buttonHamburger.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer, logo);
    });

    buttonClosed.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer, logo);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer, logo);
    });
  },

  _toggleDrawer(event, drawer, logo) {
    event.stopPropagation();
    drawer.classList.toggle('visible');
    drawer.classList.toggle('show');
    logo.classList.toggle('visible');
    logo.classList.toggle('hidden');
  },

  _closeDrawer(event, drawer, logo) {
    event.stopPropagation();
    drawer.classList.remove('visible');
    drawer.classList.remove('show');
    logo.classList.add('visible');
    logo.classList.remove('hidden');
  },
};

export default DrawerInitiator;

import { createElement } from './helpers/create-element.js';
import Gallery from './models/Gallery.js';

const app = document.getElementById('app');

createElement({
  tag: 'header',
  parentNode: app,
  props: {
    className: 'container',
    innerHTML: '<h1>Dom manipulation</h1>',
  },
});

const main = createElement({
  tag: 'main',
  parentNode: app,
});

createElement({
  tag: 'footer',
  parentNode: app,
  props: {
    className: 'footer container',
    innerContent: '© 2025 Dramen',
  },
});

const gallery = new Gallery();
gallery.init(main);

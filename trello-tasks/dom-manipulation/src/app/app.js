import { Router } from '@/router/router.js';
import { createElement } from '@helpers';

export class App {
  constructor(root) {
    this.root = root;
  }

  init() {
    const header = createElement({
      tag: 'header',
      props: {
        className: 'container',
        innerHTML: '<h1>Dom manipulation</h1>',
      },
    });

    const main = createElement({ tag: 'main' });

    const footer = createElement({
      tag: 'footer',
      props: {
        className: 'footer container',
        textContent: '© 2025 Dramen',
      },
    });

    Router.init(main);
    this.root.append(header, main, footer);
  }
}

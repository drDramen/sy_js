import { Router } from '@/router/router.js';
import { Navigation } from '@components';
import { RouteName } from '@lib/enums/name-route.enum.js';
import { createElement } from '@helpers';

const navigationItems = [
  { textContent: 'Home', href: RouteName.Home },
  { textContent: 'Gallery', href: RouteName.Gallery },
];

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

    header.append(new Navigation(navigationItems, 'app-navigation').node);

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

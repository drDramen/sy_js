import { View } from './View.js';
import { Router } from '@/router/router.js';

export class Link extends View {
  static navigationLinks = [];

  constructor(props) {
    super({ tag: 'a', props });
    this.node.addEventListener('click', (event) => {
      event.preventDefault();
      const { currentTarget } = event;
      if (currentTarget instanceof HTMLAnchorElement) {
        window.history.pushState({}, '', currentTarget.href);
        Link.changeActive();
        Router.onPathChangeHandler();
      }
    });
  }

  static addNavigationLink(navigationLink) {
    this.navigationLinks.push(navigationLink);
    Link.changeActive();
  }

  static changeActive() {
    const path = window.location.pathname;
    Link.navigationLinks.forEach((link) => {
      if (link.getAttribute('href') === path) {
        link.addClass('active');
      } else {
        link.removeClass('active');
      }
    });
  }
}

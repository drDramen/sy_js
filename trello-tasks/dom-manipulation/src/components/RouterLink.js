import { View } from './View.js';
import { Router } from '@/router/router.js';

export class RouterLink extends View {
  static navigationLinks = [];

  constructor(props, parentNode) {
    super({ tag: 'a', props, parentNode });

    RouterLink.navigationLinks.push(this);
    RouterLink.changeActive();

    this.node.addEventListener('click', (event) => {
      event.preventDefault();
      const { currentTarget } = event;
      if (
        currentTarget instanceof HTMLAnchorElement &&
        !currentTarget.classList.contains('active')
      ) {
        window.history.pushState({}, '', currentTarget.href);
        RouterLink.changeActive();
        Router.onPathChangeHandler();
      }
    });
  }

  static changeActive() {
    const path = window.location.pathname;

    RouterLink.navigationLinks.forEach((link) => {
      if (link.getAttribute('href') === path) {
        link.addClass('active');
      } else {
        link.removeClass('active');
      }
    });
  }
}

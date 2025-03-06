import { RouterLink, View } from '@components';

export class Navigation extends View {
  constructor(items, className = '') {
    super({
      tag: 'nav',
      props: {
        className: `navigation ${className}`.trim(),
      },
    });

    const navigationItems = new View({
      tag: 'ul',
      parentNode: this.node,
      props: {
        className: 'navigation__items list',
      },
    });

    items.forEach((props) => {
      new RouterLink(
        {
          ...props,
          className: 'navigation__link link',
        },
        new View({
          tag: 'li',
          parentNode: navigationItems,
          props: {
            className: 'navigation__item',
          },
        })
      );
    });
  }
}

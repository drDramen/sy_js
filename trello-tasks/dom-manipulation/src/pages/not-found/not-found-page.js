import { View } from '@components';

import './styles.css';

export class NotFound extends View {
  constructor() {
    super({
      tag: 'section',
      props: {
        className: 'not-found',
      },
    });

    this.node.innerHTML = '<div class="glitch" data-glitch="404">404</div>';
  }
}

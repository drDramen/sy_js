import { View } from '@components';

export class HomePage extends View {
  constructor() {
    super({
      tag: 'section',
      props: {
        className: 'home-page container',
        textContent: 'Home Page',
      },
    });
  }
}

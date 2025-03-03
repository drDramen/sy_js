import { createElement } from '../helpers/create-element.js';
import View from './View.js';

export default class ImageCard extends View {
  constructor(data) {
    super({ tag: 'figure', props: {} });

    createElement({
      tag: 'img',
      parentNode: createElement({
        parentNode: this.node,
        props: {
          className: 'image-container',
        },
      }),
      props: {
        src: data.url,
        alt: data.description,
      },
    });

    createElement({
      tag: 'figcaption',
      parentNode: this.node,
      props: {
        className: 'image-description',
        textContent: data.description,
      },
    });
  }
}

import { createElement } from '../helpers/create-element.js';
import View from './View.js';

export default class LightBoxControl extends View {
  constructor(actionCallback) {
    super({
      props: {
        className: 'lightbox__control',
      },
    });

    this.orderNumberString = createElement({
      tag: 'p',
      parentNode: this.node,
      props: {
        className: 'lightbox__counter',
        textContent: ``,
      },
    });

    const previousButton = createElement({
      tag: 'button',
      parentNode: this.node,
      props: {
        className: 'lightbox__button',
        innerHTML: '&#9664;',
      },
    });

    const nextButton = createElement({
      tag: 'button',
      parentNode: this.node,
      props: {
        className: 'lightbox__button',
        innerHTML: '&#9654;',
      },
    });

    const closeButton = createElement({
      tag: 'button',
      parentNode: this.node,
      props: {
        className: 'lightbox__button',
        innerHTML: '&#8569;',
      },
    });

    closeButton.addEventListener('click', () => {
      actionCallback('close');
    });

    previousButton.addEventListener('click', () => {
      actionCallback('prev');
    });

    nextButton.addEventListener('click', () => {
      actionCallback('next');
    });
  }

  updateOrderNumberString(currentIndex, numberOfImages) {
    this.orderNumberString.innerHTML = `${currentIndex + 1}&nbsp;/&nbsp;${numberOfImages}`;
  }
}

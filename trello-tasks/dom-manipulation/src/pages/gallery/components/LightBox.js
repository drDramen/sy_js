import { View } from '@components';
import { createElement } from '@helpers';
import { LightBoxControl } from './LightBoxControl.js';

export class LightBox extends View {
  constructor() {
    super({
      props: {
        className: 'lightbox',
      },
    });
    this.images = [];
    this.currentIndex = -1;
    this.lightBoxControl = new LightBoxControl(this.handleAction.bind(this));

    const lightboxContent = createElement({
      parentNode: this.node,
      props: {
        className: 'lightbox__content',
      },
    });
    lightboxContent.append(this.lightBoxControl.node);

    this.image = createElement({
      tag: 'img',
      parentNode: createElement({
        parentNode: createElement({
          parentNode: lightboxContent,
          props: {
            className: 'image-wrapper',
          },
        }),
        props: {
          className: 'image-container',
        },
      }),
    });
    this.description = createElement({
      tag: 'p',
      parentNode: lightboxContent,
      props: {
        className: 'image-description',
      },
    });

    document.body.append(this.node);
  }

  handleAction(actionType) {
    const lastIndex = this.images.length - 1;

    switch (actionType) {
      case 'next':
        this.currentIndex = this.currentIndex < lastIndex ? this.currentIndex + 1 : 0;
        break;
      case 'prev':
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : lastIndex;
        break;
      case 'close':
        this.node.classList.remove('lightbox--active');
        document.body.classList.remove('disable-scroll');
        this.currentIndex = -1;
        return;
    }

    this.update();
  }

  update() {
    const imageData = this.images[this.currentIndex];

    this.lightBoxControl.updateOrderNumberString(this.currentIndex, this.images.length);
    this.image.src = imageData.url;
    this.image.alt = this.description.textContent = imageData.description;
  }

  init(images, currentIndex) {
    this.images = images;
    this.currentIndex = currentIndex;
    this.update();
    this.node.classList.add('lightbox--active');
    document.body.classList.add('disable-scroll');
  }
}

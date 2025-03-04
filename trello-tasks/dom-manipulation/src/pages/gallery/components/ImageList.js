import { createElement } from '@helpers';
import { View } from '@components';
import { ImageCard } from './ImageCard.js';

export class ImageList extends View {
  constructor(handleCardClick, handleCardDelete) {
    super({
      tag: 'ul',
      props: {
        className: 'gallery__items',
      },
    });

    this.node.addEventListener('click', (event) => {
      const listItem = event.target.closest('.gallery__item');

      if (!listItem) {
        return;
      }
      const index = +listItem.dataset.itemIndex;
      const isDelete = event.target.closest('.image-delete');

      if (isDelete) {
        return handleCardDelete(index);
      }

      handleCardClick(index);
    });

    this.render = this.render.bind(this);
  }

  render(data) {
    this.clear();

    const cards = data.map((item, index) => {
      const listItem = new View({
        tag: 'li',
        props: {
          className: 'gallery__item',
        },
      });
      listItem.node.dataset.itemIndex = index;

      const deleteButton = createElement({
        tag: 'button',
        parentNode: this.node,
        props: {
          className: 'image-delete common-button',
          textContent: 'delete',
        },
      });

      listItem.append(new ImageCard({ ...item }), deleteButton);

      return listItem;
    });

    this.append(...cards);
  }

  clear() {
    this.children.forEach((child) => {
      child.destroy();
    });
  }
}

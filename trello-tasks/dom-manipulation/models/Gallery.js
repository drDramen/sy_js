import { store } from '../helpers/store.js';
import { createElement } from '../helpers/create-element.js';
import GalleryForm from '../components/GalleryForm.js';
import ImageList from '../components/ImageList.js';
import LightBox from '../components/LightBox.js';

export default class Gallery {
  constructor() {
    this.state = store({ images: [] });
    this.lightBox = new LightBox();
    this.galleryForm = new GalleryForm(this.addImage.bind(this));
    this.imageList = new ImageList(this.openLightBox.bind(this), this.removeImage.bind(this));
  }

  init(parentNode) {
    this.state.subscribe('images', this.imageList.render);
    this.render(parentNode);
  }

  render(parentNode) {
    const gallery = createElement({
      tag: 'article',
      parentNode,
      props: {
        className: 'gallery container',
      },
    });

    createElement({
      tag: 'header',
      parentNode: gallery,
      props: {
        innerHTML: '<h2 class="gallery__title">Task 0</h2>',
      },
    });
    const wrapper = createElement({ parentNode: gallery });

    this.imageList.render(this.state.images);

    wrapper.append(this.galleryForm.node, this.imageList.node);
  }

  addImage(data) {
    this.state.images = this.state.images.concat(data);
  }

  removeImage(index) {
    this.state.images = this.state.images.filter((_, i) => i !== index);
  }

  openLightBox(index) {
    this.lightBox.init(this.state.images, index);
  }
}

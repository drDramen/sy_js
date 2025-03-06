import { View } from '@components';
import { store, createElement } from '@helpers';
import { LightBox, GalleryForm, ImageList } from './components';

import './styles.css';

const STORAGE_NAME = 'sy_gallery_images';

export class GalleryPage extends View {
  constructor() {
    super({
      tag: 'section',
      props: {
        className: 'gallery container',
      },
    });

    const images = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];

    this.state = store({ images });
    this.lightBox = new LightBox();
    this.galleryForm = new GalleryForm(this.addImage.bind(this));
    this.imageList = new ImageList(this.openLightBox.bind(this), this.removeImage.bind(this));

    this.init();
  }

  init() {
    this.state.subscribe('images', this.imageList.render);
    this.state.subscribe('images', this.updateStorage.bind(this));
    this.render();
  }

  render() {
    createElement({
      tag: 'header',
      parentNode: this.node,
      props: {
        innerHTML: '<h2 class="gallery__title"> Task: Gallery</h2>',
      },
    });
    const wrapper = createElement({ parentNode: this.node });

    this.imageList.render(this.state.images);

    wrapper.append(this.galleryForm.node, this.imageList.node);
  }

  addImage(data) {
    this.state.images = this.state.images.concat(data);
  }

  removeImage(index) {
    this.state.images = this.state.images.filter((_, i) => i !== index);
  }

  updateStorage() {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(this.state.images));
  }

  openLightBox(index) {
    this.lightBox.init(this.state.images, index);
  }

  destroy() {
    super.destroy();
    this.lightBox.destroy();
  }
}

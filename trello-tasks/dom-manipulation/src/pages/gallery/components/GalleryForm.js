import { View } from '@components';

export class GalleryForm extends View {
  constructor(handleAddImage) {
    super({
      tag: 'form',
      props: {
        className: 'gallery-form',
      },
    });
    this.node.innerHTML =
      '<label class="gallery-form__line" for="url"><span>Url</span><input class="text-field" type="url" name="url" id="url" placeholder="Enter image url" pattern="https?:\\/\\/.*\\.(?:png|gif|webp|jpeg|jpg).*" autocomplete="off" required /></label><label class="gallery-form__line" for="description"><span>Description</span><input class="text-field" type="text" name="description" id="description" placeholder="Enter image description" autocomplete="off" required maxlength="50"/></label><input type="submit" class="gallery-form__add common-button" value="Add image" />';

    this.node.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(e.target));

      handleAddImage(data);
      e.target.reset();
    });
  }
}

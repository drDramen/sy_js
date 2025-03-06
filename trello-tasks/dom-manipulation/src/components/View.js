export class View {
  constructor({ tag = 'div', props = {}, parentNode }) {
    this.node = document.createElement(tag);
    this.children = [];

    if (props) {
      Object.assign(this.node, props);
    }

    if (parentNode) {
      parentNode.append(this.node);
    }
  }

  append(...rest) {
    rest.forEach((child) => {
      if (child instanceof View) {
        this.children.push(child);
        this.node.append(child.node);
      } else {
        this.node.append(child);
      }
    });
  }

  addClass(...className) {
    this.node.classList.add(...className);
  }

  removeClass(...className) {
    this.node.classList.remove(...className);
  }

  toggleClass(className) {
    this.node.classList.toggle(className);
  }

  getAttribute(attribute) {
    return this.node.getAttribute(attribute);
  }

  setAttribute(attribute, value) {
    this.node.setAttribute(attribute, value);
  }

  removeAttribute(attribute) {
    this.node.removeAttribute(attribute);
  }

  setContent(content) {
    this.node.textContent = content;
  }

  remove() {
    this.node.remove();
  }

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.remove();
  }
}

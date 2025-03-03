export default class View {
  constructor({ tag = 'div', props }) {
    this.node = document.createElement(tag);
    this.children = [];

    if (props) {
      Object.assign(this.node, props);
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

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.node.remove();
  }
}

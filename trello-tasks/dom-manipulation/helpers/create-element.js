export const createElement = ({ tag = 'div', parentNode, props }) => {
  const element = document.createElement(tag);

  if (props) {
    Object.assign(element, props);
  }

  if (parentNode) {
    parentNode.appendChild(element);
  }

  return element;
};

export const createElement = ({ tag, className, parentNode, innerHtml = '', textContent = '' }) => {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (innerHtml) {
    element.innerHTML = innerHtml;
  }
  if (textContent) {
    element.textContent = textContent;
  }

  if (parentNode !== null) {
    parentNode.appendChild(element);
  }

  return element;
};

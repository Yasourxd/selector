export const getUniqueSelectorFromEvent = event => {
  const target = event.target;
  const selectorParts = [];

  const getNodeSelector = node => {
    if (!node) return;

    let selector = node.tagName.toLowerCase();

    if (node.id) {
      selector += `#${node.id}`;
      selectorParts.unshift(selector);
      return;
    }

    if (node.className) {
      const classes = Array.from(node.classList).map(className => `.${className}`).join('');
      selector += classes;
    }

    // Differentiate between elements with the same selector using index
    const index = Array.from(node.parentNode.children).indexOf(node) + 1;
    selector += `:nth-child(${index})`;

    selectorParts.unshift(selector);
    getNodeSelector(node.parentNode);
  }

  getNodeSelector(target);

  return selectorParts.join(' > ');
};

export const registerServiceWorker = () => {
  navigator.serviceWorker.register('/sw.js', { scope: '/' });
};
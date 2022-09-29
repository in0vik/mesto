export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderedItems = items;
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((cardData) => {
      this._renderer(cardData);
    })
  }
}
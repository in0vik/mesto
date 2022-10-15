export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  
  }

  addItem(element, addType) {
    if (addType === 'append') {
      this._container.append(element);
    } else if (addType === 'prepend') {
      this._container.prepend(element);
    }
    
  }

  renderItems() {
    this._items.forEach((cardData) => {
      this._renderer(cardData);
    })
  }
}
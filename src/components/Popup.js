export default class Popup {
  constructor(popupSelector, selectors) {
    this._popup = document.querySelector(popupSelector);
    this._selectors = selectors;
  }

  open() {
    this._popup.classList.add(this._selectors.popupOpened);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._selectors.popupOpened);
    document.removeEventListener("keydown", this._handleEscClose);

  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleCloseAction);
    
  }

  _handleCloseAction = (e) => {
    if (e.target.classList.contains(this._selectors.popupCloseButtonForContains)) {
      this.close();
    }
    if (e.target.classList.contains(this._selectors.popupOpened)) {
      this.close();
    }
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  }
}
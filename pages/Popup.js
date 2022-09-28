import { selectors } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(selectors.popupCloseButton);
  }

  open() {
    this._popup.classList.add(selectors.popupOpened);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove(selectors.popupOpened);

  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleCloseAction);
    document.addEventListener("keydown", this._handleEscClose);

  }

  _removeEventListeners() {
    this._popup.removeEventListener("click", this._handleCloseAction);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleCloseAction = (e) => {
    if (e.target.classList.contains(selectors.popupCloseButtonForContains)) {
      this.close();
    }
    if (e.target.classList.contains(selectors.popupOpened)) {
      this.close();
    }
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  }
}
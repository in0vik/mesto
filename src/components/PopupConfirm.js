import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, selectors) {
    super(popupSelector, selectors);
    this._form = this._popup.querySelector(selectors.formSubmitDelete);
  }

  setEventListeners() {
    this._form.addEventListener("submit", this._submitAction);
    super.setEventListeners();
  }

  close() {
    this._popup.classList.remove(this._selectors.popupOpened);
    document.removeEventListener("keydown", this._handleEscClose);
    this._form.removeEventListener("submit", this._submitAction);
  }

  setSubmitAction(action) {
    this._submitAction = action;
  }

}
import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, selectors) {
    super(popupSelector, selectors);
    this._form = this._popup.querySelector(selectors.formSubmitDelete);
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitAction();
    });
    super.setEventListeners();
  }

  setSubmitAction(action) {
    this._submitAction = action;
  }
}
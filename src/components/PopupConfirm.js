import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, selectors) {
    super(popupSelector, selectors);
  }

  setEventListeners() {
    this._form = this._popup.querySelector(this._selectors.formSubmitDelete);
    this._form.addEventListener("submit", this._submitAction);

    super.setEventListeners();
  }

  setSubmitAction(action) {
    this._submitAction = action;
  }

}
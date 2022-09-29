import { selectors } from "../utils/constants.js";
import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._popupForm = document.querySelector(popupSelector);
  }

  _getInputValues() {
    this._inputList = Array.from(this._popupForm.querySelectorAll(selectors.inputSelector)); 
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._formSubmitHandler);
    super.setEventListeners();
  }

  close() {
    this._getInputValues();
    this._inputList.forEach((input) => {
      input.value = '';
    })
    super.close();
  }
}
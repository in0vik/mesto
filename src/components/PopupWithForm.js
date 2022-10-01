import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler, selectors) {
    super(popupSelector, selectors);
    this._formSubmitHandler = formSubmitHandler;
    this._popupForm = this._popup.querySelector(selectors.formSelector);
    this._inputList = this._popupForm.querySelectorAll(selectors.inputSelector);
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[`${input.name}`] = `${input.value}`
    }) 
    return this._inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._submitForm);
    super.setEventListeners();
  }

  _submitForm = (e) => {
    e.preventDefault();
    this._formSubmitHandler(this._getInputValues())
  }

  close() {
    this._getInputValues();
    this.clearForm();
    super.close();
  }

  clearForm() {
    this._inputList.forEach((input) => {
      input.value = '';
    })
  }
}
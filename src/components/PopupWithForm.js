import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler, selectors) {
    super(popupSelector, selectors);
    this._formSubmitHandler = formSubmitHandler;
    this._popupForm = this._popup.querySelector(selectors.formSelector);
    this._inputList = this._popupForm.querySelectorAll(selectors.inputSelector);
    this._submitButton = this._popupForm.querySelector(selectors.submitButtonSelector)
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value
    }) 
    return this._inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleSubmitForm);
    super.setEventListeners();
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._formSubmitHandler(this._getInputValues())
  }

  close() {
    this.clearForm();
    super.close();
  }

  clearForm() {
    this._popupForm.reset();
  }

  loading(isLoading){
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранить'
    }
    
  }
}
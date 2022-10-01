export default class FormValidator {
  constructor (selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);

  }

  toggleButtonState () {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._selectors.inactiveButtonClass)
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners () {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _showInputError (inputElement, errorMessage) {
    const errorMessageElement = this._formElement.querySelector(
      `.${this._selectors.inputErrorClassBase}${inputElement.id}`
    );
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorMessageElement.textContent = errorMessage;
    errorMessageElement.classList.add(this._selectors.errorClassVisible);
  }

  _hideInputError (inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `.${this._selectors.inputErrorClassBase}${inputElement.id}`
    );
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._selectors.errorClassVisible);
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation () {
    this._setEventListeners();
  }

}
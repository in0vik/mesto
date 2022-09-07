export { FormValidator };

class FormValidator {
  constructor (selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
  }

  _toggleButtonState (inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._selectors.inactiveButtonClass)
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._selectors.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
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
    const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    const buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
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

  enableValidation () {
    this._setEventListeners();
  }

}
// переключает состояние кнопки submit

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// проверяет есть ли невалидные поля

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// показывает ошибку валидации

const showInputError = (formElement, element, errorMessage, selectors) => {
  const errorMessageElement = formElement.querySelector(
    `.${selectors.inputErrorClassBase}${element.id}`
  );
  element.classList.add(selectors.inputErrorClass);
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(selectors.errorClassVisible);
};

// прячет ошибку валидации

const hideInputError = (formElement, element, selectors) => {
  const errorMessageElement = formElement.querySelector(
    `.${selectors.inputErrorClassBase}${element.id}`
  );
  element.classList.remove(selectors.inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(selectors.errorClassVisible);
};

// проверяет валидность поля

const checkInputValidity = (inputElement, formElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

// добавляет слушателей

const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(inputElement, formElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

// включает валидацию
const enableValidation = (selectors) => {
  const formElements = Array.from(document.querySelectorAll(selectors.formSelector));
  formElements.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};

enableValidation({
  formSelector: ".popup__container_type_form",
  inputSelector: ".input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_type_disable",
  inputErrorClass: "input_error",
  inputErrorClassBase: "popup__error-message_type_",
  errorClassVisible: "popup__error-message_type_visible",
});

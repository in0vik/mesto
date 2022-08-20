// переключает состояние кнопки submit

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-button_type_disable");
  } else {
    buttonElement.classList.remove("popup__submit-button_type_disable");
  }
};

// проверяет есть ли невалидные поля

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// показывает ошибку валидации

const showInputError = (formElement, element, errorMessage) => {
  const errorMessageElement = formElement.querySelector(`.popup__error-message_type_${element.id}`);
  element.classList.add("input_error");
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add("popup__error-message_type_visible");
};

// прячет ошибку валидации

const hideInputError = (formElement, element) => {
  const errorMessageElement = formElement.querySelector(`.popup__error-message_type_${element.id}`);
  element.classList.remove("input_error");
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove("popup__error-message_type_visible");
};

// проверяет валидность поля

const checkInputValidity = (inputElement, formElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// добавляет слушателей

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll("input"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// включает валидацию
const enableValidation = () => {
  const formElements = Array.from(document.querySelectorAll(".popup__container_type_form"));
  formElements.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./formValidator.js";

export { openImageHandler };

// variables
const popupTypeEditProfileElement = document.querySelector(".popup_type_edit-profile");
const popupTypeAddPlaceElement = document.querySelector(".popup_type_add-place");
const popupTypeImageElement = document.querySelector(".popup_type_image");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__profile-name-input");
const jobInput = document.querySelector(".popup__profile-job-input");
const addCardButton = document.querySelector(".profile__add-person-button");
const popupPlaceName = document.querySelector(".popup__place-name-input");
const popupPlaceLink = document.querySelector(".popup__place-link-input");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupImage = document.querySelector(".popup__image");
const popupImageDescription = document.querySelector(".popup__image-description");
const popupFormProfile = document.querySelector(".popup__container_type_profile-form");
const popupFormPlace = document.querySelector(".popup__container_type_place-form");

// enable validation 

const formElements = Array.from(document.querySelectorAll('.popup__container_type_form'));
    formElements.forEach((formElement) => {
     const formValidate = new FormValidator({
        formSelector: ".popup__container_type_form",
        inputSelector: ".input",
        submitButtonSelector: ".popup__submit-button",
        inactiveButtonClass: "popup__submit-button_type_disable",
        inputErrorClass: "input_error",
        inputErrorClassBase: "popup__error-message_type_",
        errorClassVisible: "popup__error-message_type_visible",
      }, formElement);
      formValidate.enableValidation()
    });

// open popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEsc);
}

// close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEsc);
}

// close popup on escape

function closePopupOnEsc(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// open image popup handler

function openImageHandler(e) {
    const cardTitleElement = e.target.closest('.card').querySelector('.card__title');
    openPopup(popupTypeImageElement);
    popupImageDescription.textContent = cardTitleElement.textContent;
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;
}

// listeners on close buttons
const popupCloseButtons = Array.from(document.querySelectorAll(".popup__close-button"));
popupCloseButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    closePopup(e.target.closest(".popup"));
  });
});

//listeners on popup overlay for closing popups
const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
});

// listeners on submit buttons

popupFormProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormPlace.addEventListener("submit", handlePlaceFormSubmit);

// submit form button
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (evt.target.checkValidity()) {
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;
    evt.target.reset();
    closePopup(evt.target.closest(".popup"));
  }
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  // if (evt.target.checkValidity()) {
    const submitButton = evt.target.querySelector(".popup__submit-button_type_place");
    const newCardData = {};
    newCardData.name = popupPlaceName.value;
    newCardData.link = popupPlaceLink.value;

    const newCard = new Card(newCardData, 'card-template')
    renderItem(cardElements, newCard);
    evt.target.reset();
    submitButton.disabled = true;
    submitButton.classList.add("popup__submit-button_type_disable");
    closePopup(evt.target.closest(".popup"));
  // }
}

// profile edit

popupEditButton.addEventListener("click", (e) => {
  const submitButton = document.querySelector(".popup__submit-button_type_profile");
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  submitButton.disabled = false;
  submitButton.classList.remove("popup__submit-button_type_disable");
  openPopup(popupTypeEditProfileElement);
});

// card generator

const cardElements = document.querySelector(".elements");

initialCards.forEach((data) => {
  const newCard = new Card(data, 'card-template');
  renderItem(cardElements, newCard);
});

function renderItem(wrap, card) {
  wrap.prepend(card.getCard());
}

// add a new card

addCardButton.addEventListener("click", () => {
  openPopup(popupTypeAddPlaceElement);
});

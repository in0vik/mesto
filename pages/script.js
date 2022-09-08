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

//form validators

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
  })
}

enableValidation({
  formSelector: ".popup__container_type_form",
  inputSelector: ".input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_type_disable",
  inputErrorClass: "input_error",
  inputErrorClassBase: "popup__error-message_type_",
  errorClassVisible: "popup__error-message_type_visible",
})

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

// handle image card click 

function handleCardClick (name, link) {
  openPopup(popupTypeImageElement);
  popupImageDescription.textContent = name;
  popupImage.src = link;
}

// listeners on close buttons
// const popupCloseButtons = Array.from(document.querySelectorAll(".popup__close-button"));
// popupCloseButtons.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     closePopup(e.target.closest(".popup"));
//   });
// });

//listeners on popup overlay for closing popups
const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    console.log(e.target);
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (e.target.classList.contains('popup__close-button')) {
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
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  evt.target.reset();
  closePopup(evt.target.closest(".popup"));

}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {};
  newCardData.name = popupPlaceName.value;
  newCardData.link = popupPlaceLink.value;

  const newCard = createCard(newCardData, 'card-template', handleCardClick)
  renderItem(cardElements, newCard);
  evt.target.reset();
  closePopup(evt.target.closest(".popup"));
}

// profile edit

popupEditButton.addEventListener("click", (e) => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  
  formValidators.profileForm.resetValidation();
  formValidators.profileForm.enableValidation();
  openPopup(popupTypeEditProfileElement);
});

// card generator

const cardElements = document.querySelector(".elements");

initialCards.forEach((cardData) => {
  const newCard = createCard(cardData);

  renderItem(cardElements, newCard);
});

function renderItem(wrap, card) {
  wrap.prepend(card);
}

function createCard(cardData) {
  const newCard = new Card(cardData, 'card-template', handleCardClick);
  const cardElement = newCard.getCard();
  return cardElement;
}

// add a new card

addCardButton.addEventListener("click", () => {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
  formValidators.placeForm.resetValidation();
  formValidators.placeForm.enableValidation();
  openPopup(popupTypeAddPlaceElement);
});


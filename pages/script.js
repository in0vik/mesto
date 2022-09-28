import Card from "./Card.js";
import { initialCards } from "./cards.js";
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import { selectors } from "../utils/constants.js";

const cardElements = document.querySelector(selectors.cardElements);

initialCards.forEach((cardData) => {
  const newCard = createCard(cardData);
  renderItem(cardElements, newCard);
});

function renderItem(wrap, card) {
  wrap.prepend(card);
}

function createCard(cardData) {
  const newCard = new Card(cardData, selectors.cardTemplate, handleCardClick);
  const cardElement = newCard.getCard();
  return cardElement;
}

function handleCardClick (name, link) {
  const popupWithImage = new PopupWithImage(selectors.popupWithImage);
  popupWithImage.open(link, name);
}

//form validators

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    formValidators[formName].enableValidation();
  })
}

enableValidation({
  formSelector: selectors.formSelector,
  inputSelector: selectors.inputSelector,
  submitButtonSelector: selectors.submitButtonSelector,
  inactiveButtonClass: selectors.inactiveButtonClass,
  inputErrorClass: selectors.inputErrorClass,
  inputErrorClassBase: selectors.inputErrorClassBase,
  errorClassVisible: selectors.errorClassVisible,
})

// add a new card

const addCardButton = document.querySelector(selectors.addCardButton);
const popupPlaceName = document.querySelector(selectors.popupPlaceName);
const popupPlaceLink = document.querySelector(selectors.popupPlaceLink);

const popupWithPlaceForm = new PopupWithForm(selectors.formPlaceSelector, formPlaceSubmitHandler);

addCardButton.addEventListener("click", () => {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
  formValidators.placeForm.resetValidation();
  formValidators.placeForm.toggleButtonState();
  popupWithPlaceForm.open();
});

function formPlaceSubmitHandler(evt) {
    evt.preventDefault();
    const newCardData = {};
    newCardData.name = popupPlaceName.value;
    newCardData.link = popupPlaceLink.value;
  
    const newCard = createCard(newCardData, selectors.cardTemplate, handleCardClick)
    renderItem(cardElements, newCard);
    popupWithPlaceForm.close();
}

// edit profile
const profileEditButton = document.querySelector(selectors.profileEditButton);
const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);
const profileNameElement = document.querySelector(selectors.profileNameElement);
const profileJobElement = document.querySelector(selectors.profileJobElement);

const popupWithProfileForm = new PopupWithForm(selectors.formProfileSelector, formProfileSubmitHandler);


profileEditButton.addEventListener("click", () => {
  popupWithProfileForm.open();
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  
  formValidators.profileForm.resetValidation();
  
});

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  evt.target.reset();
  popupWithProfileForm.close();
}
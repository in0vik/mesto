import Card from "../components/Card.js";
import { initialCards } from "../utils/cards.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { selectors } from "../utils/constants.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

// const cardElements = document.querySelector(selectors.cardElements);
const sectionInstance = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      sectionInstance.addItem(card);
    },
  },
  selectors.cardElements
);

sectionInstance.renderItems();

function createCard(cardData) {
  const newCard = new Card(cardData, selectors.cardTemplate, handleCardClick);
  const cardElement = newCard.getCard();
  return cardElement;
}

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(selectors.popupWithImage);
  popupWithImage.open(link, name);
}

//form validators

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    formValidators[formName].enableValidation();
  });
};

enableValidation({
  formSelector: selectors.formSelector,
  inputSelector: selectors.inputSelector,
  submitButtonSelector: selectors.submitButtonSelector,
  inactiveButtonClass: selectors.inactiveButtonClass,
  inputErrorClass: selectors.inputErrorClass,
  inputErrorClassBase: selectors.inputErrorClassBase,
  errorClassVisible: selectors.errorClassVisible,
});

// add a new card

const addCardButton = document.querySelector(selectors.addCardButton);
const popupPlaceName = document.querySelector(selectors.popupPlaceName);
const popupPlaceLink = document.querySelector(selectors.popupPlaceLink);

const popupWithPlaceForm = new PopupWithForm(selectors.formPlaceSelector, formPlaceSubmitHandler);

addCardButton.addEventListener("click", () => {
  popupPlaceName.value = "";
  popupPlaceLink.value = "";
  formValidators.placeForm.resetValidation();
  formValidators.placeForm.toggleButtonState();
  popupWithPlaceForm.open();
});

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const newCardData = {};
  newCardData.name = popupPlaceName.value;
  newCardData.link = popupPlaceLink.value;
  const newCard = createCard(newCardData, selectors.cardTemplate, handleCardClick);
  sectionInstance.addItem(newCard)
  popupWithPlaceForm.close();
}

// edit profile
const profileEditButton = document.querySelector(selectors.profileEditButton);
const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);

const popupWithProfileForm = new PopupWithForm(
  selectors.formProfileSelector,
  formProfileSubmitHandler
);
const userInfoInstance = new UserInfo({
  userNameSelector: selectors.profileNameElement,
  userJobSelector: selectors.profileJobElement,
});

profileEditButton.addEventListener("click", () => {
  popupWithProfileForm.open();
  const userInfo = userInfoInstance.getUserInfo();
  nameInput.value = userInfo.username;
  jobInput.value = userInfo.job;
  userInfoInstance.setUserInfo(userInfo);
  formValidators.profileForm.resetValidation();
});

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  userInfoInstance.setUserInfo({
    username: nameInput.value,
    job: jobInput.value,
  });
  evt.target.reset();
  popupWithProfileForm.close();
}

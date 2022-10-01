// да вы правы ошибка в этом css файле! Там был пробел в начале файла. 
// Предположу у вас не завелось потому что у вас win а у меня *nix, из за отличия в синтаксе в оболочках.
// в винде на сколько я знаю обратный слеш это разделитель пути и вероятно он его как то не правильно парсит.
// второй варинат это опять же парсер винды как то этот пробел по своему обратывает.
//
// Спасибо что уделили время разобраться!

import Card from "../components/Card.js";
import { initialCards } from "../utils/cards.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { selectors } from "../utils/constants.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardsSection.addItem(card);
    },
  },
  selectors.cardElements
);

cardsSection.renderItems();

function createCard(cardData) {
  const newCard = new Card(cardData, selectors.cardTemplate, handleCardClick, selectors);
  const cardElement = newCard.getCard();
  return cardElement;
}

const popupWithImage = new PopupWithImage(selectors.popupWithImage, selectors);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open({ link, name });
}

//form validators

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.name;
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

function handlePlaceSubmitButton(data) {
  data.name = popupPlaceName.value;
  data.link = popupPlaceLink.value;
  const newCard = createCard(data, selectors.cardTemplate, handleCardClick);
  cardsSection.addItem(newCard)
  popupWithPlaceForm.close();
}

const popupWithPlaceForm = new PopupWithForm(
  selectors.popupAddPlace, 
  handlePlaceSubmitButton,
  selectors
);
popupWithPlaceForm.setEventListeners();

addCardButton.addEventListener("click", () => {
  popupPlaceName.value = "";
  popupPlaceLink.value = "";
  formValidators.placeForm.resetValidation();
  formValidators.placeForm.toggleButtonState();
  popupWithPlaceForm.open();
});



// edit profile
const profileEditButton = document.querySelector(selectors.profileEditButton);
const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);

const popupWithProfileForm = new PopupWithForm(
  selectors.popupEditProfile,
  handleFormProfileSubmit,
  selectors
);
popupWithProfileForm.setEventListeners();

const userInfoInstance = new UserInfo({
  userNameSelector: selectors.profileNameElement,
  userJobSelector: selectors.profileJobElement,
});

profileEditButton.addEventListener("click", handleProfileEditButton);

function handleProfileEditButton() {
  popupWithProfileForm.open();
  const userInfo = userInfoInstance.getUserInfo();
  nameInput.value = userInfo.username;
  jobInput.value = userInfo.job;
  formValidators.profileForm.resetValidation();
}

function handleFormProfileSubmit(data) {
  userInfoInstance.setUserInfo({
    username: nameInput.value,
    job: jobInput.value,
  });
  popupWithProfileForm.close();
}

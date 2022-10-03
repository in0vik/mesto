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

function handlePlaceSubmitButton({ placename, link }) {
  const newCard = createCard({ name: placename, link }, selectors.cardTemplate, handleCardClick);
  cardsSection.addItem(newCard);
  popupWithPlaceForm.close();
}

const popupWithPlaceForm = new PopupWithForm(
  selectors.popupAddPlace, 
  handlePlaceSubmitButton,
  selectors
);
popupWithPlaceForm.setEventListeners();

addCardButton.addEventListener("click", () => {
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
    username: data.username,
    job: data.job,
  });
  popupWithProfileForm.close();
}

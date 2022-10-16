import Card from "../components/Card.js";
import { initialCards } from "../utils/cards.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { selectors } from "../utils/constants.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";

// API

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    authorization: "728a51fd-95af-420a-8e63-afea89fd240c",
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  userNameSelector: selectors.profileNameElement,
  userJobSelector: selectors.profileJobElement,
  userAvatarSelector: selectors.profileAvatar,
});

const popupConfirm = new PopupConfirm(selectors.popupDeleteConfirm, selectors);
const popupWithImage = new PopupWithImage(selectors.popupWithImage, selectors);

const popupWithProfileForm = new PopupWithForm(
  selectors.popupEditProfile,
  handleFormProfileSubmit,
  selectors
);

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

function createCard(cardData, currentUserData) {
  const newCard = new Card(
    {
      cardData: cardData,
      handleCardClick: (name, link) => {
        popupWithImage.open({ link, name });
      },
      handleDeleteIconClick: () => {
        popupConfirm.open();
        popupConfirm.setSubmitAction((evt) => {
          evt.preventDefault();
          api
            .deleteCard(cardData._id)
            .then(() => {
              newCard.deleteCard();
              popupConfirm.close();
            })
            .catch((err) => console.log(err));
        });
        popupConfirm.setEventListeners();
      },
      handleAddLike: () => {
        api
          .likeCard(cardData._id)
          .then((res) => {
            newCard.updateCounter(res);
          })
          .catch((err) => console.log(err));
      },
      handleRemoveLike: () => {
        api
          .dislikeCard(cardData._id)
          .then((res) => {
            newCard.updateCounter(res);
          })
          .catch((err) => console.log(err));
      },
      handleLike: () => {},
    },
    selectors.cardTemplate,
    selectors,
    currentUserData
  );
  const cardElement = newCard.getCard();
  return cardElement;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, cards]) => {
    //render cards
    const cardsSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const card = createCard(cardData, userInfoData);
          cardsSection.addItem(card, "append");
        },
      },
      selectors.cardElements
    );

    cardsSection.renderItems();

    // render user info
    userInfo.setUserInfo({
      username: userInfoData.name,
      job: userInfoData.about,
    });
    userInfo.setUserAvatar(userInfoData.avatar);

    // popup instances
    const popupWithPlaceForm = new PopupWithForm(
      selectors.popupAddPlace,
      handlePlaceSubmitButton,
      selectors
    );

    popupWithImage.setEventListeners();

    // add a new card

    const addCardButton = document.querySelector(selectors.addCardButton);

    function handlePlaceSubmitButton({ placename, link }) {
      popupWithPlaceForm.loading(true);
      api.addNewCard({ name: placename, link })
        .then((cardData) => {
        const newCard = createCard(cardData, userInfoData);
        cardsSection.addItem(newCard, "prepend");
      })
        .then(() => {
        popupWithPlaceForm.close();
      })
        .finally(() => {
          popupWithPlaceForm.loading(false);
        })
        .catch(err => console.log(err));
      
    }

    popupWithPlaceForm.setEventListeners();

    addCardButton.addEventListener("click", () => {
      formValidators.placeForm.resetValidation();
      formValidators.placeForm.toggleButtonState();
      popupWithPlaceForm.open();
    });

    // change avatar
    const popupAvatar = new PopupWithForm(selectors.popupAvatar, handleAvatar, selectors);
    const changeAvatarButton = document.querySelector(selectors.changeAvatarOverlay);
    changeAvatarButton.addEventListener("click", () => {
      popupAvatar.open();
      popupAvatar.setEventListeners();
    });

    const popupAvatarInput = document.querySelector(selectors.popupAvatarInput);
    function handleAvatar() {
      popupAvatar.loading(true);
      api.updateAvatar(popupAvatarInput.value)
        .then((res) => {
          userInfo.setUserAvatar(res.avatar);
        })
        .then(() => {
          popupAvatar.close();
        })
        .finally(() => {
          popupAvatar.loading(false);
        })
        .catch(err => console.log(err));
    }

    //form validators

    enableValidation({
      formSelector: selectors.formSelector,
      inputSelector: selectors.inputSelector,
      submitButtonSelector: selectors.submitButtonSelector,
      inactiveButtonClass: selectors.inactiveButtonClass,
      inputErrorClass: selectors.inputErrorClass,
      inputErrorClassBase: selectors.inputErrorClassBase,
      errorClassVisible: selectors.errorClassVisible,
    });
  })
  .catch((err) => console.log(err));

// edit profile
const profileEditButton = document.querySelector(selectors.profileEditButton);
const nameInput = document.querySelector(selectors.nameInput);
const jobInput = document.querySelector(selectors.jobInput);

popupWithProfileForm.setEventListeners();

profileEditButton.addEventListener("click", handleProfileEditButton);

function handleProfileEditButton() {
  popupWithProfileForm.open();
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.username;
  jobInput.value = userInfoData.job;
  formValidators.profileForm.resetValidation();
}

function handleFormProfileSubmit(data) {
  popupWithProfileForm.loading(true);
  api.updateUserInfo({
    name: data.username,
    about: data.job,
  })
    .then(() => {
      userInfo.setUserInfo({
        username: data.username,
        job: data.job,
      });
  })
    .then(() => {
    popupWithProfileForm.close();
  })
    .finally(() => {
      popupWithProfileForm.loading(false);
  })
    .catch(err => console.log(err));
  
}

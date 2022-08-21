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
  if (evt.target.checkValidity()) {
    const submitButton = evt.target.querySelector(".popup__submit-button_type_place");
    renderItem(cardElements, popupPlaceName.value, popupPlaceLink.value);
    evt.target.reset();
    submitButton.disabled = true;
    submitButton.classList.add("popup__submit-button_type_disable");
    closePopup(evt.target.closest(".popup"));
  }
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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardElements = document.querySelector(".elements");
const cardTemplate = document.getElementById("card-template");

initialCards.forEach(({ name, link }) => {
  renderItem(cardElements, name, link);
});

function getCard(title, image) {
  const newCard = cardTemplate.content.cloneNode(true);
  const newTitle = newCard.querySelector(".card__title");
  const newImage = newCard.querySelector(".card__image");
  const likeButton = newCard.querySelector(".card__like-button");
  const deleteButton = newCard.querySelector(".card__delete-button");

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", function (e) {
    e.target.closest(".card").remove();
  });

  newImage.addEventListener("click", function (e) {
    const cardTitleElement = e.target.closest(".card").querySelector(".card__title");
    openPopup(popupTypeImageElement);
    popupImageDescription.textContent = cardTitleElement.textContent;
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;
  });

  newTitle.textContent = title;
  newImage.src = image;
  newImage.alt = title;
  return newCard;
}

function renderItem(wrap, title, image) {
  wrap.prepend(getCard(title, image));
}

// add a new card

addCardButton.addEventListener("click", () => {
  openPopup(popupTypeAddPlaceElement);
});

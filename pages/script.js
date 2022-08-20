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
const popupForms = document.querySelectorAll(".popup__container_type_form");

// open popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupOnEsc);
}

// close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupOnEsc);
}

// close popup on escape

function closePopupOnEsc(e) {
  const openedPopup = document.querySelector(".popup_opened");
  if (e.key === "Escape") {
    closePopup(openedPopup);
  }
}

// listeners on close buttons
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
popupCloseButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    closePopup(e.target.closest(".popup"));
  });
});

//listeners on popup overlay for closing popups
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
});

// listeners on submit buttons

popupForms.forEach((form) => {
  form.addEventListener("submit", handleProfileFormSubmit);
});

// submit form button
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (evt.target.querySelector(".popup__submit-button_type_profile")) {
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;
  }
  if (evt.target.querySelector(".popup__submit-button_type_place")) {
    renderItem(cardElements, popupPlaceName.value, popupPlaceLink.value);
  }
  evt.target.reset();
  closePopup(evt.target.closest(".popup"));
}

// profile edit

popupEditButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openPopup(popupTypeEditProfileElement);
  enableValidation();
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
    e.target.parentElement.remove();
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
  if ((title, image)) {
    wrap.prepend(getCard(title, image));
  }
}

// add a new card

addCardButton.addEventListener("click", () => {
  openPopup(popupTypeAddPlaceElement);
});

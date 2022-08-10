// form
const popupContainer = document.getElementById('form-popup-template').content.cloneNode(true).querySelector('.popup__container');
const popupImageContainer = document.getElementById('image-popup-template').content.cloneNode(true).querySelector('.popup__image-container');
const popupElement = document.querySelector(".popup");
popupElement.append(popupContainer);
const formElement = document.querySelector(".popup__container");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__job");
const popupTitle = document.querySelector('.popup__title');
const nameInput = formElement.querySelector(".popup__name-input");
const jobInput = formElement.querySelector(".popup__job-input");
const popupFirstField = formElement.querySelector('.popup__name-input');
const popupSecondField = formElement.querySelector(".popup__job-input");
const popupCloseButton = formElement.querySelector(".popup__close-button");
const popupEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// open popup
function openPopup(popup, popupContainer) {
  popup.replaceChildren();
  popup.classList.add("popup_opened");
  popup.append(popupContainer);
}

// close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.replaceChildren();
}

// submit button
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupElement);
}

function formSubmitCardHandler(evt) {
  evt.preventDefault();
  renderItem(cardElements, popupFirstField.value, popupSecondField.value);
  closePopup(popupElement);
}

// listeners

popupEditButton.addEventListener("click", () => {
  popupElement.classList.add('popup_type_form');
  formElement.addEventListener("submit", formSubmitHandler);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  popupHandler('Редактировать профиль', 'Имя', 'О себе')
  openPopup(popupElement, popupContainer)
});

// card generator 

const initialCards = [
  { 
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardElements = document.querySelector('.elements');
const template = document.getElementById('card-template');

const getCard = (title, image) => {
  const newCard = template.content.cloneNode(true);
  const newTitle = newCard.querySelector('.card__title');
  const newImage = newCard.querySelector('.card__image');
  const likeButton = newCard.querySelector('.card__like-button');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const placeImage = newCard.querySelector('.card__image');

  likeButton.addEventListener("click", function() {
    likeButton.classList.toggle("card__like-button_active");
  })

  deleteButton.addEventListener('click', function(e) {
    e.target.parentElement.remove()
  })

  placeImage.addEventListener('click', function(e) {
    openPopup(popupElement, popupImageContainer);
    const popupImage = document.querySelector('.popup__image');
    const popupImageDescription = document.querySelector('.popup__image-description');
    popupImageDescription.textContent = e.target.parentElement.querySelector('.card__title').textContent;
    popupImage.src = e.target.src;
    popupElement.classList.add('popup_type_image');
    const popupImageCloseButton = document.querySelector('.popup__image-close-button');
    popupImageCloseButton.addEventListener("click", (e) => {
      e.preventDefault();
      closePopup(popupElement);
      popupElement.classList.remove('popup_type_image');
    })

  })

  popupCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    closePopup(popupElement);
    popupElement.classList.remove('popup_type_form');
    formElement.removeEventListener("submit", formSubmitCardHandler);
  })

  

  newTitle.textContent = title;
  newImage.src = image;
  return newCard;
}


function renderItem(wrap, title, image){
  if (title, image) {
    wrap.prepend(getCard(title, image))
  }
} 

initialCards.forEach(({name, link}) => {
  renderItem(cardElements, name, link)
}) 

// add card form

const addCardButton = document.querySelector('.profile__add-person-button');

addCardButton.addEventListener("click", addCardButtonHandler);

function addCardButtonHandler() {
  popupElement.classList.add('popup_type_form');
  openPopup(popupElement, popupContainer);
  popupHandler('Новое место', 'Название', 'Ссылка на картинку');
  popupFirstField.value = '';
  popupSecondField.value = '';
  formElement.removeEventListener("submit", formSubmitHandler);
  formElement.addEventListener("submit", formSubmitCardHandler);
}

function popupHandler(title, firstField, secondField) {
  popupTitle.textContent = title;
  popupFirstField.placeholder = firstField;
  popupSecondField.placeholder = secondField;
}

// variables
const popupTypeEditProfileElement = document.querySelector(".popup_type_edit-profile");
const popupTypeAddPlaceElement = document.querySelector(".popup_type_add-place");
const popupTypeImageElement = document.querySelector(".popup_type_image");
const formElementEditProfile = document.querySelector(".popup__container_type_edit-profile");
const formElementAddPlace = document.querySelector(".popup__container_type_add-place");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__profile-name-input");
const jobInput = document.querySelector(".popup__profile-job-input");
const addCardButton = document.querySelector('.profile__add-person-button');
const popupPlaceName = document.querySelector('.popup__place-name-input');
const popupPlaceLink = document.querySelector(".popup__place-link-input");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupImage = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector('.popup__image-description');

// open popup
function openPopup(popup) {
  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup(popup);
  })
  popup.classList.add("popup_opened");
}

// close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// submit form button
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupTypeEditProfileElement);
}

// profile edit

popupEditButton.addEventListener("click", () => {
  formElementEditProfile.addEventListener("submit", formSubmitHandler);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openPopup(popupTypeEditProfileElement);
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
const cardTemplate = document.getElementById('card-template');

initialCards.forEach(({name, link}) => {
  renderItem(cardElements, name, link)
})  

function getCard(title, image){
  const newCard = cardTemplate.content.cloneNode(true);
  const newTitle = newCard.querySelector('.card__title');
  const newImage = newCard.querySelector('.card__image');
  const likeButton = newCard.querySelector('.card__like-button');
  const deleteButton = newCard.querySelector('.card__delete-button');

  likeButton.addEventListener("click", function() {
    likeButton.classList.toggle("card__like-button_active");
  })

  deleteButton.addEventListener('click', function(e) {
    e.target.parentElement.remove()
  })

  newImage.addEventListener('click', function(e) {
    const cardTitleElement = e.target.parentElement.querySelector('.card__title');
    openPopup(popupTypeImageElement);
    popupImageDescription.textContent = cardTitleElement.textContent;
    popupImage.src = e.target.src;
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

// add a new card

addCardButton.addEventListener("click", () => {
  openPopup(popupTypeAddPlaceElement);
  formElementAddPlace.addEventListener("submit", formSubmitCardHandler);
});

function formSubmitCardHandler(evt) {
  evt.preventDefault();
  renderItem(cardElements, popupPlaceName.value, popupPlaceLink.value);
  closePopup(popupTypeAddPlaceElement);
}

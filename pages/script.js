let formElement = document.querySelector(".popup__container");
let popupElement = document.querySelector(".popup");
let profileNameElement = document.querySelector(".profile__name");
let profileJobElement = document.querySelector(".profile__job");
let nameInput = formElement.querySelector(".popup__name-input");
let jobInput = formElement.querySelector(".popup__job-input");
let popupEditButton = document.querySelector(".profile__edit-button");
let popupCloseButton = formElement.querySelector(".popup__close-button");


function formSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  popupElement.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);

popupEditButton.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  popupElement.classList.add("popup_opened");
});

popupCloseButton.addEventListener("click", function () {
  popupElement.classList.remove("popup_opened");
});

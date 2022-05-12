let formElement = document.querySelector('.popup__container'); 
let popupElement = document.querySelector('.popup')
let nameInput = formElement.querySelector('.popup__name-input'); 
let jobInput = formElement.querySelector('.popup__occupation-input');
let popupEditButton = document.querySelector('.profile__edit-button');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileNameElement = document.querySelector('.profile__name')
let profileJobElement = document.querySelector('.profile__occupation')


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__occupation');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupElement.classList.remove("popup_opened");

}

formElement.addEventListener("submit", formSubmitHandler);


popupEditButton.addEventListener("click", function(event) {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
    popupElement.classList.add("popup_opened");
})

popupCloseButton.addEventListener("click", function(event) {
    popupElement.classList.remove("popup_opened");
})


export default class Card {
  constructor ({cardData, handleCardClick, handleDeleteIconClick, handleAddLike, handleRemoveLike, handleLike }, templateSelector, selectors, currentUserData) {
    this._selectors = selectors;
    this._templateSelector = templateSelector;
    this._name = cardData.name;
    this._link = cardData.link;  
    this._likes = cardData.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteIconClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._cardData = cardData;
    this._currentUserData = currentUserData;

    // this._handleLike = handleLike;
  };

  _getTemplate() {
    const newCardElement = document
    .getElementById(this._templateSelector)
    .content
    .querySelector(this._selectors.card)
    .cloneNode(true);
    return newCardElement;
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener("click", () => {
      this._handleLike(this);
    });

    this._deleteButtonElement.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });
    this._imageElement.addEventListener("click", this._handleImageClick);
  }

  _handleLike(card) {
    if (card._likeButtonElement.classList.contains(card._selectors.cardLikeButtonActive)) {
        card._dislikeCard();
      } else {
        card._likeCard();
      }
  }

  _likeCard () {
    this._handleAddLike(this);
  } 

  _dislikeCard () {
    this._handleRemoveLike(this);
  }

  removeLikeClass() {
    this._likeButtonElement.classList.remove(this._selectors.cardLikeButtonActive);

  }

  addLikeClass() {
    this._likeButtonElement.classList.add(this._selectors.cardLikeButtonActive);
  }

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick = () => {
    this._handleCardClick(this._titleElement.textContent, this._imageElement.src);
  }

  updateCounter(data) {
    this._likeCounterElement.textContent = data.likes.length;
  }

  getCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector(this._selectors.cardTitle);
    this._imageElement = this._element.querySelector(this._selectors.cardImage);
    this._likeButtonElement = this._element.querySelector(this._selectors.cardLikeButton);
    this._deleteButtonElement = this._element.querySelector(this._selectors.cardDeleteButton);
    this._likeCounterElement = this._element.querySelector(this._selectors.likeCounterElement);
    this._likeCounterElement.textContent = this._likes.length;  
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    if (this._cardData.owner._id !== this._currentUserData._id) {
      this._deleteButtonElement.remove()
    }

    this._cardData.likes.forEach(elem => {
      if (elem._id === this._currentUserData._id) {
        this.addLikeClass();
      };
    })
    this._setEventListeners();
    return this._element;
  } 

}
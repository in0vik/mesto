export default class Card {
  constructor (cardData, cardTemplateSelector, handleCardClick, selectors) {
    this._selectors = selectors;
    this._name = cardData.name;
    this._link = cardData.link;  
    this._templateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeButtonElement.addEventListener("click", this._handleLikeButton);
    this._deleteButtonElement.addEventListener("click", this._handleDeleteButton);
    this._imageElement.addEventListener("click", this._handleImageClick);
  }

  _handleLikeButton = () => {
    this._likeButtonElement.classList.toggle(this._selectors.cardLikeButtonActive);
  } 

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
    
  }

  _handleImageClick = () => {
    this._handleCardClick(this._titleElement.textContent, this._imageElement.src);
    
  }

  getCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector(this._selectors.cardTitle);
    this._imageElement = this._element.querySelector(this._selectors.cardImage);
    this._likeButtonElement = this._element.querySelector(this._selectors.cardLikeButton);
    this._deleteButtonElement = this._element.querySelector(this._selectors.cardDeleteButton);
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._setEventListeners();
    return this._element;
  } 

}
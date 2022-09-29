import { selectors } from "../utils/constants.js";

export default class Card {
  constructor (cardData, cardTemplateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;  
    this._templateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const newCardElement = document
    .getElementById(this._templateSelector)
    .content
    .cloneNode(true);
    return newCardElement;
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener("click", function () {
      this.classList.toggle(selectors.cardLikeButtonActive);
    });

    this._deleteButtonElement.addEventListener("click", function (e) {
      this.closest(selectors.card).remove();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._titleElement.textContent, this._imageElement.src);
    });
  }

  getCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector(selectors.cardTitle);
    this._imageElement = this._element.querySelector(selectors.cardImage);
    this._likeButtonElement = this._element.querySelector(selectors.cardLikeButton);
    this._deleteButtonElement = this._element.querySelector(selectors.cardDeleteButton);
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._setEventListeners();

    return this._element;
  } 
}
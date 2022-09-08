export { Card };
import { openImageHandler } from './script.js';


class Card {
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
      this.classList.toggle("card__like-button_active");
    });

    this._deleteButtonElement.addEventListener("click", function (e) {
      this.closest(".card").remove();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._titleElement.textContent, this._imageElement.src);
    });
  }

  getCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector('.card__title');
    this._imageElement = this._element.querySelector('.card__image');
    this._likeButtonElement = this._element.querySelector('.card__like-button');
    this._deleteButtonElement = this._element.querySelector('.card__delete-button');
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._setEventListeners();

    return this._element;
  } 
}
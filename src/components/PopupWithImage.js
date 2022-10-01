import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, selectors) {
    super(popupSelector);
    this._selectors = selectors;
  }
  
  open({ link, name }) {
    this._popupImage = this._popup.querySelector(this._selectors.popupImage);
    this._popupTitle = this._popup.querySelector(this._selectors.popupImageDescription);
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}
import { selectors } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(selectors.popupImage);
    this._popupTitle = this._popup.querySelector(selectors.popupImageDescription);
  }
  
  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}
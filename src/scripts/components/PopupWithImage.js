import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector(".popup__image");
    this._title = this._popupSelector.querySelector(".popup__subtitle");
  }

  open(name, link) {
    this._image.src = link;
    this._title.textContent = name;
    this._title.alt = name;
    super.open();
  }
}

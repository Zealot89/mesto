import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._container = this._popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    const [name, link] = this._container.querySelectorAll(".popup__input");
    return {
      name: name.value,
      link: link.value,
    };
  }

  close() {
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._container.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());

      this.close();
    });
  }
}

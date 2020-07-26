import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._container = this._popupSelector.querySelector(".popup__form");
    this._submitButton = this._container.querySelector(".popup__button");
  }

  _getInputValues() {
    const values = {};

    this._popupSelector.querySelectorAll(".popup__input").forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
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

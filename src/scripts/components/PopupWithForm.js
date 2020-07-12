import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._container = this._popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._container.querySelectorAll(".popup__input");

    const values = [];

    this._inputList.forEach((item) => {
      values.push(item.value);
    });
    return values;
  }

  close() {
    super.close();
    //this._container.reset();

    //const inputList = Array.from(
    //  this._container.querySelectorAll(".popup__input")
    //);
    //inputList.forEach((item) => {
    //  item.value = "";
    //});
  }
  setEventListeners() {
    super.setEventListeners();
    this._container.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}

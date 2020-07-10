export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  close() {
    this._popupSelector.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  open() {
    this._popupSelector.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.keyCode === 27) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__toggle")
      ) {
        //*если клик произошел по оверлею или иконке закрытия - закрыть попап
        this.close();
      }
    });
  }
}

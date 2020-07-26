import { Popup } from "./Popup.js";
export class PopupWidthConfirm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }
  confirm(example) {
    this._popupSelector.addEventListener("submit", (evt) =>
      this._submit(evt, example)
    );
    super.open();
  }
}

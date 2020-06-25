export const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export default class FormValidator {
  constructor(obj, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
  }
  enableValidation() {
    const inputs = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    //Блокируем кнопку после открытия попапа
    this._lockUnlockButton(inputs, submitButton, this._inactiveButtonClass);

    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        //Проверяем валидность введенных данных
        this._checkInputValidity(
          this._formSelector,
          inputElement,
          inputElement.validationMessage,
          this._inputErrorClass,
          this._errorClass
        );
        //Блокировка/разблокировка кнопки
        this._lockUnlockButton(inputs, submitButton, this._inactiveButtonClass);
      });
      //скрываем ошибки
      this._hideError(
        this._formSelector,
        inputElement,
        this._inputErrorClass,
        this._errorClass
      );
    });
  }

  //Проверяем валидность полей ввода
  _checkInputValidity(
    formSelector,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
  ) {
    if (!inputElement.checkValidity())
      this._unhideError(
        formSelector,
        inputElement,
        errorMessage,
        inputErrorClass,
        errorClass
      );
    else
      this._hideError(formSelector, inputElement, inputErrorClass, errorClass);
  }

  //Скрываем ошибку
  _hideError(formSelector, inputElement, inputErrorClass, errorClass) {
    const errorElement = formSelector.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }
  //Показываем ошибку
  _unhideError(
    formSelector,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
  ) {
    const errorElement = formSelector.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }
  //Блокируем/разблокируем кнопку
  _lockUnlockButton(inputs, buttonElement, buttonError) {
    if (this._inputInvalid(inputs)) {
      buttonElement.classList.add(buttonError);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(buttonError);
      buttonElement.removeAttribute("disabled");
    }
  }

  _inputInvalid(inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.checkValidity();
    });
  }
}

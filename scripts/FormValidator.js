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
    this._toggleButtonState(inputs, submitButton, this._inactiveButtonClass);

    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        //Проверяем валидность введенных данных
        this._checkInputValidity(inputElement);
        //Блокировка/разблокировка кнопки
        this._toggleButtonState(
          inputs,
          submitButton,
          this._inactiveButtonClass
        );
      });
      //скрываем ошибки
      this._hideError(inputElement);
    });
  }

  //Проверяем валидность полей ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.checkValidity())
      this._showInputError(inputElement, inputElement.validationMessage);
    else this._hideError(inputElement);
  }

  //Скрываем ошибку
  _hideError(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  //Показываем ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formSelector.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  //Блокируем/разблокируем кнопку
  _toggleButtonState(inputs, buttonElement, buttonError) {
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

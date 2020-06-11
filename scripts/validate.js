const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function enableValidation(option) {
  const formElement = Array.from(
    document.querySelectorAll(option.formSelector)
  );
  formElement.forEach((formElement) => {
    const inputElements = Array.from(
      formElement.querySelectorAll(option.inputSelector)
    );
    inputElements.forEach((input) => {
      input.addEventListener("input", (evt) =>
        handleInput(evt, option.inputErrorClass, option.errorClass)
      );
    });
    //
    const submitButton = formElement.querySelector(option.submitButtonSelector);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    //слушатель, блокирующий/разблокирующий кнопку формы в зависимости от валидности ее полей.
    formElement.addEventListener("input", () => {
      const isFormValid = formElement.checkValidity();
      //submitButton.disabled = !isFormValid;
      submitButton.classList.toggle(option.inactiveButtonClass, !isFormValid);
    });
  });
}
// отображение ошибок валидации
function handleInput(evt, inputErrorClass, errorClass) {
  const input = evt.target;
  const error = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) {
    input.classList.remove(inputErrorClass);
    error.textContent = "";
    error.classList.remove(errorClass);
  } else {
    input.classList.add(inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(errorClass);
  }
}

//enableValidation(obj);

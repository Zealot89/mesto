export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
export const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export const profileName = document.querySelector(".profile__title");
export const profileActiviti = document.querySelector(".profile__subtitle");
export const nameInput = document.querySelector(".popup__input_name");
export const activitiInput = document.querySelector(".popup__input_activiti");
export const popup = document.querySelector(".popup");
const saveButton = document.querySelector(".popup__button");

export function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActiviti.textContent = activitiInput.value;
  closePopups(popup);
}
export function pressEsc(evt) {
  const popupOpened = document.querySelector(".popup_active");
  if (evt.keyCode === 27) {
    closePopups(popupOpened);
  }
}
//закрытие попапа кликом на оверлей
export function clickOverlay(evt) {
  if (evt.target.matches(".popup_image"))
    closePopups(evt.target.closest(".popup_image"));
  if (evt.target.matches(".popup")) closePopups(evt.target.closest(".popup"));
}
//открытие попапов с размещением слушателей
export function openPopups(popupElement) {
  popupElement.classList.add("popup_active");
  document.addEventListener("keydown", pressEsc);
  saveButton.addEventListener("submit", formSubmitHandler);
  popupElement.addEventListener("click", clickOverlay);
  popupElement.addEventListener("submit", formSubmitHandler);
}
//закрытие попапов со снятием слушателей
export function closePopups(popupElement) {
  popupElement.classList.remove("popup_active");
  document.removeEventListener("keydown", pressEsc);
  saveButton.removeEventListener("submit", formSubmitHandler);
  popupElement.removeEventListener("click", clickOverlay);
  popupElement.removeEventListener("submit", formSubmitHandler);
}

//// разномастные переменные
const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupToggle = popup.querySelector(".popup__toggle");
const profileName = profileInfo.querySelector(".profile__title");
const profileActiviti = profileInfo.querySelector(".profile__subtitle");
const nameInput = popup.querySelector(".popup__input_name");
const activitiInput = popup.querySelector(".popup__input_activiti");
const popupForm = popup.querySelector(".popup__form");
const saveButton = popupForm.querySelector(".popup__button");
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_add-place");
const placeInput = document.querySelector(".popup__input_place");
const linkInput = document.querySelector(".popup__input_link");
const insertButton = document.querySelector(".popup__button_insert");
const toggleCloseButton = document.querySelector(".popup__toggle_add");
const addCardPopup = document.querySelector(".popup__form_add");
const closeButtonReview = document.querySelector(".popup__toggle_review");
const popupReview = document.querySelector(".popup_review");
const inputFieldLinks = document.querySelector(".popup__input_link"),
  entryFieldLocations = document.querySelector(".popup__input_place");

import { obj } from "./FormValidator.js";
import FormValidator from "./FormValidator.js";
import { Card } from "./Card.js";

// заполнение профиля из полей ввода
export function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActiviti.textContent = activitiInput.value;
  closePopups(popup);
}
// закрытие попапа по нажатию Esc
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
function closePopups(popupElement) {
  popupElement.classList.remove("popup_active");
  document.removeEventListener("keydown", pressEsc);
  saveButton.removeEventListener("submit", formSubmitHandler);
  popupElement.removeEventListener("click", clickOverlay);
  popupElement.removeEventListener("submit", formSubmitHandler);
}

//добавление карточки
function addItem() {
  const card = new Card(entryFieldLocations.value, inputFieldLinks.value);
  const cardElement = card.generateCard();
  const cardList = document.querySelector(".elements__list");
  cardList.prepend(cardElement);
}
//заполнение полей ввода в попапе редактирования профиля
function formFilling() {
  if (popup.classList.contains("popup_active")) {
    nameInput.value = profileName.textContent;
    activitiInput.value = profileActiviti.textContent;
  } else {
    popupForm.reset();
  }
}

// добавлене карточки из попапа
function addCardformSubmitHandler(evt) {
  evt.preventDefault();
  addItem();
  linkInput.value = inputFieldLinks.textContent;
  placeInput.value = entryFieldLocations.textContent;
  closePopups(addPopup);
}

// разномастные слушатели
closeButtonReview.addEventListener("click", () => closePopups(popupReview));
editButton.addEventListener("click", () => {
  const profileFormValidation = new FormValidator(obj, popup);
  profileFormValidation.enableValidation();
  openPopups(popup);
  formFilling();
});
addCardPopup.addEventListener("submit", addCardformSubmitHandler);
popupToggle.addEventListener("click", () => closePopups(popup));
addButton.addEventListener("click", () => {
  const addFormValidation = new FormValidator(obj, addPopup);
  addFormValidation.enableValidation();
  openPopups(addPopup);
});
insertButton.addEventListener("submit", addCardformSubmitHandler);
toggleCloseButton.addEventListener("click", () => closePopups(addPopup));

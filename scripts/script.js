//// разномастные переменные
const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");
const popupToggle = popup.querySelector(".popup__toggle");
const popupForm = popup.querySelector(".popup__form");
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
const cardSelector = document.querySelector("#item");

import {
  obj,
  initialCards,
  openPopups,
  closePopups,
  profileName,
  profileActiviti,
  nameInput,
  activitiInput,
  popup,
} from "./util.js";
import FormValidator from "./FormValidator.js";
import { Card } from "./Card.js";

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, cardSelector);
  const cardElement = card.generateCard();
  const cardList = document.querySelector(".elements__list");

  cardList.append(cardElement);
});

//добавление карточки
function addItem() {
  const card = new Card(
    entryFieldLocations.value,
    inputFieldLinks.value,
    cardSelector
  );
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

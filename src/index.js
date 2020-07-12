import "./style.css";

import {
  cardSelector,
  obj,
  initialCards,
  nameInput,
  activityInput,
  popup,
  editButton,
  addButton,
  addPopup,
  popupReview,
  inputFieldLinks,
  entryFieldLocations,
} from "./scripts/utils/constants.js";

import { PopupWithImage } from "./scripts/components/PopupWithImage.js";

import FormValidator from "./scripts/components/FormValidator.js";
import { Card } from "./scripts/components/Card.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { UserInfo } from "./scripts/components/UserInfo.js";

//экземпляр класа попапа с картинкой
const popupImage = new PopupWithImage(popupReview);

function handleCardClick(name, link) {
  popupImage.open(name, link);
  popupImage.setEventListeners();
}

//экземпляр класа профиля
const newUserInfo = new UserInfo({
  name: ".profile__title",
  activity: ".profile__subtitle",
});
//экземпляр класа попапа добавления карточки с колбэком самого добавления
const newAddPopup = new PopupWithForm(addPopup, (values) => {
  const card = new Card(values[0], values[1], cardSelector, {
    handleCardClick,
  }).generateCard();

  cards.addItem(card);
  newAddPopup.close();
});
newAddPopup.setEventListeners();
//экземпляр класа попапа профиля с колбэком
const newEditPopup = new PopupWithForm(popup, (values) => {
  newUserInfo.setUserInfo(values);
  newEditPopup.close();
});
newEditPopup.setEventListeners();
//экземпляр класа Section
const cards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, cardSelector, {
        handleCardClick,
      }).generateCard();
      cards.addItem(card);
    },
  },
  ".elements__list"
);

cards.render();

//слушатель открытия попапа профиля
editButton.addEventListener("click", () => {
  const profileFormValidation = new FormValidator(obj, popup);
  profileFormValidation.enableValidation();
  nameInput.value = newUserInfo.getUserInfo().name;
  activityInput.value = newUserInfo.getUserInfo().activity;
  newEditPopup.open();
});
//слушатель открытия попапа карточек
addButton.addEventListener("click", () => {
  entryFieldLocations.value = "";
  inputFieldLinks.value = "";
  const addFormValidation = new FormValidator(obj, addPopup);
  addFormValidation.enableValidation();
  newAddPopup.open();
});

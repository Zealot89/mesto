import "./style.css";

import {
  obj,
  initialCards,
  nameInput,
  activitiInput,
  popup,
} from "./scripts/utils/util.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { cardSelector } from "./scripts/utils/constants.js";
import FormValidator from "./scripts/components/FormValidator.js";
import { Card } from "./scripts/components/Card.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { UserInfo } from "./scripts/components/UserInfo.js";

//// разномастные переменные
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_add-place");
const popupReview = document.querySelector(".popup_review");
const inputFieldLinks = document.querySelector(".popup__input_link"),
  entryFieldLocations = document.querySelector(".popup__input_place");
const cardList = document.querySelector(".elements__list");
//экземпляр класа попапа с картинкой
const popupImage = new PopupWithImage(popupReview);

//функция открытия попапа с размещением слушателей
function newOpenPopup(popup) {
  popup.open();
  popup.setEventListeners();
}
//экземпляр класа профиля
const newUserInfo = new UserInfo({
  name: ".profile__title",
  activity: ".profile__subtitle",
});
//экземпляр класа попапа добавления карточки с колбэком самого добавления
const newAddPopup = new PopupWithForm(addPopup, () => {
  const card = new Card(
    entryFieldLocations.value,
    inputFieldLinks.value,
    cardSelector,
    {
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
        popupImage.setEventListeners();
      },
    }
  );
  const cardElement = card.generateCard();

  cardList.prepend(cardElement);
  newAddPopup.close();
});
//экземпляр класа попапа профиля с колбэком
const newEditPopup = new PopupWithForm(popup, (values) => {
  newUserInfo.setUserInfo(values);
  newEditPopup.close();
});
//экземпляр класа Section
const cards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, cardSelector, {
        handleCardClick: (name, link) => {
          popupImage.open(name, link);
          popupImage.setEventListeners();
        },
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
  newOpenPopup(newEditPopup);
  nameInput.value = newUserInfo.getUserInfo().name;
  activitiInput.value = newUserInfo.getUserInfo().activity;
});
//слушатель открытия попапа карточек
addButton.addEventListener("click", () => {
  entryFieldLocations.value = "";
  inputFieldLinks.value = "";
  const addFormValidation = new FormValidator(obj, addPopup);
  addFormValidation.enableValidation();
  newOpenPopup(newAddPopup);
});

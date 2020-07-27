import "./style.css";

import {
  avatarPopup,
  confPop,
  obj,
  nameInput,
  activityInput,
  popup,
  editButton,
  addButton,
  addPopup,
  popupReview,
  inputFieldLinks,
  entryFieldLocations,
} from "../scripts/utils/constants.js";

import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import FormValidator from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api";
import { PopupWidthConfirm } from "../scripts/components/PopupWithConfirm";

//Экземпляр класса Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-13",
  headers: {
    authorization: "a34a1e6b-d078-470d-87dd-2211c9e10f70",
    "Content-Type": "application/json",
  },
});

// Нужно дляэкземпляра класса Section
let cards;

//экземпляры валидации всех форм на странице
const addFormValidation = new FormValidator(obj, addPopup);
addFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(obj, avatarPopup);
avatarFormValidation.enableValidation();

const profileFormValidation = new FormValidator(obj, popup);
profileFormValidation.enableValidation();

//Экземпляр попапа удаления карточки
const popupConfirm = new PopupWidthConfirm(confPop, (evt, example) => {
  evt.preventDefault();
  const confirmButton = popupConfirm._popupSelector.querySelector(
    ".popup__button"
  );
  confirmButton.textContent = "Сохранение...";
  api
    .deleteCardData(example.id)
    .then(() => {
      example.remove();
    })
    .finally(() => {
      confirmButton.textContent = "Ок";
      popupConfirm.close();
    });
});
popupConfirm.setEventListeners();

//экземпляр класа попапа с картинкой
const popupImage = new PopupWithImage(popupReview);
popupImage.setEventListeners();

//колбек для попапа с картинкой
function handleCardClick(item) {
  popupImage.open(item.name, item.link);
}

//экземпляр класа профиля
const newUserInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);
// Загрузка имени и деятельности пользователя
api
  .getUserData(function (name, about, avatar) {
    newUserInfo.setUserInfo({
      name: name,
      about: about,
      avatar: avatar,
    });
  })
  .then((currentUser) => {
    document.querySelector(".profile__avatar").src = currentUser.avatar;
    //загрузка и отрисовка начального массива карточек с сервера
    api
      .getInitialCards()
      .then((initialCards) => {
        initialCards.reverse();
        cards = new Section(
          {
            items: initialCards,
            renderer: function (item) {
              const card = new Card(
                item,
                "#item",
                () => {
                  handleCardClick(item);
                },
                currentUser._id === item.owner._id,
                () => popupConfirm.confirm(card),
                () => api.likeCard(currentUser, item, card),

                currentUser._id
              ).generateCard();

              cards.addItem(card);
            },
          },
          ".elements__list"
        );

        cards.render();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
//экземпляр попапа аватарки
const newAvatarPopup = new PopupWithForm(avatarPopup, (value) => {
  const newAvatarButton = newAvatarPopup._popupSelector.querySelector(
    ".popup__button"
  );
  newAvatarButton.textContent = "Сохранение...";
  api
    .changeAvatar(value)
    .then((res) => {
      document.querySelector(".profile__avatar").src = res.avatar;
      newAvatarButton.textContent = "Создать";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newAvatarPopup.close();
    });
});
newAvatarPopup.setEventListeners();

//экземпляр класа попапа добавления карточки с колбэком самого добавления
const newAddPopup = new PopupWithForm(addPopup, (values) => {
  const newAddButton = newAddPopup._popupSelector.querySelector(
    ".popup__button"
  );
  api
    .saveCardData(values)
    .then((res) => {
      newAddButton.textContent = "Сохранeние...";
      const card = new Card(
        res,
        "#item",
        () => {
          handleCardClick(res);
        },
        true,
        () => popupConfirm.confirm(card),
        () =>
          api.likeCard(res.owner, res, card).catch((err) => {
            console.log(err);
          }),
        res.owner._id
      ).generateCard();
      newAddButton.textContent = "Cоздать";
      cards.addItem(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newAddPopup.close();
    });
});
newAddPopup.setEventListeners();

//экземпляр класа попапа профиля с колбэком
const newEditPopup = new PopupWithForm(popup, (values) => {
  const newEditButton = newEditPopup._popupSelector.querySelector(
    ".popup__button"
  );
  newEditButton.textContent = "Сохранение...";
  api
    .saveUserData(values)
    .then(() => {
      newUserInfo.setUserInfo(values);
      newEditButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newEditPopup.close();
    });
});
newEditPopup.setEventListeners();

//слушатель открытия попапа профиля
editButton.addEventListener("click", () => {
  nameInput.value = newUserInfo.getUserInfo().name;
  activityInput.value = newUserInfo.getUserInfo().about;
  newEditPopup.open();
});
//слушатель открытия попапа карточек
addButton.addEventListener("click", () => {
  entryFieldLocations.value = "";
  inputFieldLinks.value = "";
  newAddPopup.open();
});
//слушатель открытия попапа аватара
const avatarButton = document.querySelector(".profile__image-button");
avatarButton.addEventListener("click", () => {
  newAvatarPopup.open();
});

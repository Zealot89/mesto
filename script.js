const initialCards = [
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

const profile = document.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupToggle = popup.querySelector(".popup__toggle");

let profileName = profileInfo.querySelector(".profile__title");
let profileActiviti = profileInfo.querySelector(".profile__subtitle");
let nameInput = popup.querySelector(".popup__input_name");
let activitiInput = popup.querySelector(".popup__input_activiti");
let popupForm = popup.querySelector(".popup__form");
const saveButton = popupForm.querySelector(".popup__button");
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_add-place");
let placeInput = document.querySelector(".popup__input_place");
let linkInput = document.querySelector(".popup__input_link");
const insertButton = document.querySelector(".popup__button_insert");
const toggleCloseButton = document.querySelector(".popup__toggle_add");
const addCardPopup = document.querySelector(".popup__form_add");
const item = document.querySelector("#item").content;
const list = document.querySelector(".elements__list");

const popupReview = document.querySelector(".popup_review");

let popupSubtitle = document.querySelector(".popup__subtitle");
let popupImage = document.querySelector(".popup__image");

function popupReviewOpenClose() {
  popupReview.classList.toggle("popup_active");
}
//добавление карточек из массива
initialCards.forEach(function (i) {
  const listItem = item.cloneNode(true);
  listItem.querySelector(".elements__image_add").src = i.link;
  listItem.querySelector(".elements__title_add").textContent = i.name;

  listItem
    .querySelector(".elements__button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__button_active");
    });
  const elementCard = listItem.querySelector(".elements__element");
  const deleteButton = elementCard.querySelector(".elements__delete-button");
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".elements__element");

    listItem.remove();
  });
  list.append(listItem);
});
const card = list.querySelector(".elements__element");
let cardImage = document.querySelectorAll(".elements__image");
let i = cardImage.length;
while (i--)
  cardImage[i].addEventListener("click", (evt) => {
    popupReviewOpenClose();
    const listItem = evt.target.closest(".elements__element");
    popupImage.src = listItem.querySelector(".elements__image").src;
    popupSubtitle.textContent = listItem.querySelector(
      ".elements__title"
    ).textContent;
  });
//функция добавления новой карточки
function addItem() {
  const listItem = item.cloneNode(true);
  listItem.querySelector(".elements__image_add").src = linkInput.value;
  listItem.querySelector(".elements__title_add").textContent = placeInput.value;

  listItem //лайк новой карточки
    .querySelector(".elements__button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__button_active");
    });

  const elementCard = listItem.querySelector(".elements__element");
  const deleteButton = elementCard.querySelector(".elements__delete-button");
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".elements__element");
    listItem.remove();
  });
  listItem
    .querySelector(".elements__image")
    .addEventListener("click", function (evt) {
      popupReviewOpenClose();
      const listItem = evt.target.closest(".elements__element");
      popupImage.src = listItem.querySelector(".elements__image").src;
      popupSubtitle.textContent = listItem.querySelector(
        ".elements__title"
      ).textContent;
    });
  list.prepend(listItem);
}
// открытие-закрытие попапа профиля
function openClosePopup() {
  popup.classList.toggle("popup_active");
  if (popup.classList.contains("popup_active")) {
    nameInput.value = profileName.textContent;
    activitiInput.value = profileActiviti.textContent;
  }
}
// открытие-закрытие попапа добавления карточек
function openCloseAddPopup() {
  addPopup.classList.toggle("popup_active");
}

function formSubmitHand(evt) {
  evt.preventDefault();
  addItem();
  linkInput.value = document.querySelector(".popup__input_link").textContent;
  placeInput.value = document.querySelector(".popup__input_place").textContent;
  openCloseAddPopup();
}
// заполнение профиля из полей ввода
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActiviti.textContent = activitiInput.value;
  openClosePopup();
}
//закрытие попапа с картинкой кнопкой закрыть
const closeButtonReview = document
  .querySelector(".popup__toggle_review")
  .addEventListener("click", popupReviewOpenClose);

editButton.addEventListener("click", openClosePopup);
addCardPopup.addEventListener("submit", formSubmitHand);
popupForm.addEventListener("submit", formSubmitHandler);
popupToggle.addEventListener("click", openClosePopup);
saveButton.addEventListener("click", formSubmitHandler);
addButton.addEventListener("click", openCloseAddPopup);
insertButton.addEventListener("click", formSubmitHand);
toggleCloseButton.addEventListener("click", openCloseAddPopup);

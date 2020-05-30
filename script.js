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
const item = document.querySelector("#item").content;
const list = document.querySelector(".elements__list");
const closeButtonReview = document.querySelector(".popup__toggle_review");
const popupReview = document.querySelector(".popup_review");
const card = list.querySelector(".elements__element");
const inputFieldLinks = document.querySelector(".popup__input_link"),
  entryFieldLocations = document.querySelector(".popup__input_place");

const popupSubtitle = document.querySelector(".popup__subtitle");
const popupImage = document.querySelector(".popup__image");

function openClosePopups(popupElement) {
  popupElement.classList.toggle("popup_active");
}
function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("elements__button_active");
}

//функция добавления новой карточки
function createCard(name, link) {
  const listItem = item.cloneNode(true); //клонирование из temlate со всем содержимым
  const cardPhoto = listItem.querySelector(".elements__image_add");
  const cardName = listItem.querySelector(".elements__title_add");
  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardName.textContent = name;
  const likeButton = listItem.querySelector(".elements__button");
  likeButton.addEventListener("click", handleLikeButtonClick);
  //удаление новой карточки
  const elementCard = listItem.querySelector(".elements__element");
  const deleteButton = elementCard.querySelector(".elements__delete-button");
  function handleDeleteButtonClick() {
    const listItem = deleteButton.closest(".elements__element");
    listItem.remove();
  }
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  //заполнение попапа с картинкой из новой карточки
  const cardImage = listItem.querySelector(".elements__image");
  const cardTitle = listItem.querySelector(".elements__title");

  function completion(evt) {
    const listItem = evt.target.closest(".elements__element");
    popupImage.src = cardImage.src;
    popupSubtitle.textContent = cardTitle.textContent;
    openClosePopups(popupReview);
  }
  cardImage.addEventListener("click", completion);
  return listItem; //возвращение карточки
}
initialCards.forEach((item) => list.append(createCard(item.name, item.link)));

function addItem() {
  list.prepend(createCard(entryFieldLocations.value, inputFieldLinks.value));
}
function formFilling() {
  if (popup.classList.contains("popup_active")) {
    nameInput.value = profileName.textContent;
    activitiInput.value = profileActiviti.textContent;
  }
}
function addCardformSubmitHandler(evt) {
  evt.preventDefault();
  addItem();
  linkInput.value = inputFieldLinks.textContent;
  placeInput.value = entryFieldLocations.textContent;
  openClosePopups(addPopup);
}
// заполнение профиля из полей ввода
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActiviti.textContent = activitiInput.value;
  openClosePopups(popup);
}

closeButtonReview.addEventListener("click", () => openClosePopups(popupReview));
editButton.addEventListener("click", () => openClosePopups(popup));
editButton.addEventListener("click", formFilling);
addCardPopup.addEventListener("submit", addCardformSubmitHandler);
popupForm.addEventListener("submit", formSubmitHandler);
popupToggle.addEventListener("click", () => openClosePopups(popup));
saveButton.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", () => openClosePopups(addPopup));
insertButton.addEventListener("submit", addCardformSubmitHandler);
toggleCloseButton.addEventListener("click", () => openClosePopups(addPopup));

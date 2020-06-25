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

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
    this._cardSelector = document.querySelector("#item").content;
  }
  _getTemplate() {
    const cardElement = this._cardSelector.cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image_add").src = this._link;
    this._element.querySelector(
      ".elements__title_add"
    ).textContent = this._name;
    return this._element;
  }

  _openPopups(popupElement) {
    popupElement.classList.add("popup_active");
  }

  //Слушатели
  _setEventListeners() {
    //Заполняем попап содержимым карточки
    this._element
      .querySelector(".elements__image_add")
      .addEventListener("click", () => {
        document.querySelector(".popup__subtitle").textContent = this._name;
        document.querySelector(".popup__image").src = this._link;
        document.querySelector(".popup__image").alt = this._name;
        const popupReview = document.querySelector(".popup_review");
        this._openPopups(popupReview);
      });
    //Лайк карточки
    this._element
      .querySelector(".elements__button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__button_active");
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", this._completion);
    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", function (evt) {
        evt.target.closest(".elements__element").remove();
      });
  }
}
//Создаем карточки при загрузке страници
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  const cardList = document.querySelector(".elements__list");

  cardList.append(cardElement);
});

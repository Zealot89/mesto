import { openPopups } from "./util.js";

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = this._cardSelector.content.cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image_add").src = this._link;
    this._element.querySelector(".elements__image_add").alt = this._name;
    this._element.querySelector(
      ".elements__title_add"
    ).textContent = this._name;
    return this._element;
  }
  _deleteCard(evt) {
    evt.target.closest(".elements__element").remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle("elements__button_active");
  }

  _handleImageClick() {
    const popupReview = document.querySelector(".popup_review");
    const popupImage = popupReview.querySelector(".popup__image");
    const popupSubtitle = popupReview.querySelector(".popup__subtitle");
    popupSubtitle.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
    openPopups(popupReview);
  }
  //Слушатели
  _setEventListeners() {
    const image = this._element.querySelector(".elements__image_add");
    //Заполняем попап содержимым карточки
    image.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });

    //Лайк карточки
    this._element
      .querySelector(".elements__button")
      .addEventListener("click", this._likeCard);

    //Удаление карточки
    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", this._deleteCard);
  }
}

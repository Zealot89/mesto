export class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return this._cardTemplate.content.cloneNode(true);
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
  //оставил так потому что это все до чего я смог додуматься, а от стрелочной функции избавиться так и не выходит)
  // если вам не сложно, не могли бы вы расписать по подробнее как мне быть с этим слушателем.
  _method() {
    this._handleCardClick(this._name, this._link);
  }

  _deleteCard(evt) {
    //Снятие слушателей
    evt.target
      .closest(".elements__element")
      .querySelector(".elements__image_add")
      .removeEventListener("click", () => {
        this._method();
      });

    evt.target
      .closest(".elements__element")
      .querySelector(".elements__button")
      .removeEventListener("click", this._likeCard);

    evt.target
      .closest(".elements__element")
      .querySelector(".elements__delete-button")
      .removeEventListener("click", this._deleteCard);

    evt.target.closest(".elements__element").remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle("elements__button_active");
  }

  //Слушатели
  _setEventListeners() {
    //Заполняем попап содержимым карточки
    this._element
      .querySelector(".elements__image_add")
      .addEventListener("click", () => {
        this._method();
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

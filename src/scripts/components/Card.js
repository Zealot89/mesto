export class Card {
  constructor(name, link, cardSelector, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  //Слушатели
  _setEventListeners() {
    const image = this._element.querySelector(".elements__image_add");
    this._image = image;
    //Заполняем попап содержимым карточки
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
      //*функция-обработчик описывается при создании экземпляра класса в index.js, аргументы this._name и this._link окажутся на месте параметров name и link
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

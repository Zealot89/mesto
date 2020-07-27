export class Card {
  constructor(
    { name, link, _id, owner, likes },
    cardSelector,
    handleCardClick,
    isMine,
    handleCardDelete,
    handleCardLike,
    currentUserId
  ) {
    this._name = name;
    this._link = link;
    this._cardTemplate = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._owner = owner;
    this._id = _id;
    this._likes = likes;
    this._isMine = isMine;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._currentUserId = currentUserId;
  }

  _getTemplate() {
    return this._cardTemplate.content
      .querySelector(".elements__element")
      .cloneNode(true);
  }
  //
  generateCard() {
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector(".elements__image_add");
    const myLike = this._likes.some((likesItem) => {
      return likesItem._id === this._currentUserId;
    });
    if (myLike) this.likeCard();
    if (!this._isMine)
      this._element.querySelector(".elements__delete-button").remove();
    this._element.querySelector(
      ".elements__like-counter"
    ).textContent = this._likes.length;
    this._element.id = this._id;

    elementImage.src = this._link;
    elementImage.alt = this._name;
    this._element.querySelector(
      ".elements__title_add"
    ).textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _method() {
    this._handleCardClick(this._name, this._link);
  }

  likeCard() {
    this._element
      .querySelector(".elements__button")
      .classList.toggle("elements__button_active");
  }

  //Слушатели
  _setEventListeners() {
    //Удаление карточки
    if (this._isMine)
      this._element
        .querySelector(".elements__delete-button")
        .addEventListener("click", this._handleCardDelete);

    this._element
      .querySelector(".elements__image_add")
      .addEventListener("click", () => {
        this._method();
      });

    //Лайк карточки
    this._element
      .querySelector(".elements__button")
      .addEventListener("click", this._handleCardLike);
  }
}

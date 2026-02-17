export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLike,
    handleUnlike,
    handleDelete,
    userId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;

    this._isLiked = data.isLiked;

    this._handleDelete = handleDelete;

    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDelete(this._cardId, this._element);
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({
          name: this._name,
          link: this._link,
        });
      });
  }

  _handleLikeClick() {
    if (this._isLiked) {
      this._handleUnlike(this._cardId);
    } else {
      this._handleLike(this._cardId);
    }
  }
  _setLiked(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".card__like-button");

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._setLiked(this._isLiked);

    this._setEventListeners();

    return this._element;
  }
}

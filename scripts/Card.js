import { openModal, closeModal } from "./utils.js";

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    return document
      .querySelector("#cards__template")
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenImage() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupCaption.textContent = this._name;
    openModal(this._imagePopup);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._image.addEventListener("click", () => {
      this._handleOpenImage();
    });

    this._closePopupButton.addEventListener("click", () => {
      closeModal(this._imagePopup);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._imagePopup = document.querySelector("#image-popup");
    this._popupImage = this._imagePopup.querySelector(".popup__image");
    this._popupCaption = this._imagePopup.querySelector(".popup__caption");
    this._closePopupButton = this._imagePopup.querySelector(".popup__close");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export function renderCard(name, link, container) {
  const card = new Card(name, link);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

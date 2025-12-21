import { openModal, closeModal } from "./utils.js";

// Ceating card elements
const template = document.querySelector("#cards__template");

export function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg"
) {
  //clone the template
  const cardElement = template.content.cloneNode(true);

  //find elements inside the clone
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  //Fill up the data
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  //like button
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  //Remove button
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", function () {
    const card = this.closest(".card");
    card.remove();
  });

  //open the Image
  const openImageButton = cardElement.querySelector(".card__image");
  const imagePopup = document.querySelector("#image-popup");
  const imagePopupValue = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");

  openImageButton.addEventListener("click", function () {
    imagePopupValue.src = this.src;
    imagePopupCaption.textContent = this.alt;
    openModal(imagePopup);
  });

  // close image
  const closeImagePopup = imagePopup.querySelector(".popup__close");
  closeImagePopup.addEventListener("click", function () {
    closeModal(imagePopup);
  });

  return cardElement;
}

export function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

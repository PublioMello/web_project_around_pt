import { renderCard } from "./Card.js";
import { openModal, closeModal } from "./utils.js";
import {
  showInputError,
  hideInputError,
  hasInvalidInput,
} from "./FormValidator.js";

let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (item) {
  console.log(item.name);
});

const editProfile = document.querySelector(".profile__edit-button");
const closeProfile = document.querySelector(".popup__close");
const modal = document.querySelector(".popup");

closeProfile.addEventListener("click", function () {
  closeModal(modal);
});

const cardsContainer = document.querySelector(".cards__list");

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

// Discover the current values and displayed in the popup
const currentName = document.querySelector(".profile__title");
const currenDescription = document.querySelector(".profile__description");

function handleOpenEditModal() {
  const modalInputs = modal.querySelectorAll(".popup__input");
  const buttonInput = modal.querySelector(".popup__button");

  document.querySelector(".popup__input_type_name").value =
    currentName.textContent;
  document.querySelector(".popup__input_type_description").value =
    currenDescription.textContent;

  openModal(modal);
  toggleButtonState(buttonInput, modalInputs);
}

editProfile.addEventListener("click", function () {
  handleOpenEditModal();
});

// Find the Form and edit the values after submit
const formElement = document.querySelector(".popup__content");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  currentName.textContent = nameInput.value;
  currenDescription.textContent = jobInput.value;
  closeModal(modal);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

//adding new cards

const addLocalButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const closeLocalButton = newCardModal.querySelector(".popup__close");
addLocalButton.addEventListener("click", function () {
  openModal(newCardModal);
});

closeLocalButton.addEventListener("click", function () {
  closeModal(newCardModal);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = document.querySelector(".popup__input_type_card-name").value;
  const cardUrl = document.querySelector(".popup__input_type_url").value;

  renderCard(cardName, cardUrl, cardsContainer);
  newCardForm.reset();
  closeModal(newCardModal);
}

const newCardForm = newCardModal.querySelector(".popup__form");

newCardForm.addEventListener("submit", handleCardFormSubmit);

// adding functionality to the forms
// Edit profile

function enableButton(button) {
  button.disabled = false;
  button.classList.remove("form__button_disabled");
}

function disableButton(button) {
  button.disabled = true;
  button.classList.add("form__button_disabled");
}

function toggleButtonState(defineButton, inputs) {
  if (hasInvalidInput(inputs)) {
    disableButton(defineButton);
  } else {
    enableButton(defineButton);
  }
}

const profileForm = document.querySelector("#edit-profile-form");
const profileInputs = profileForm.querySelectorAll(".popup__input");
const profileButton = profileForm.querySelector(".popup__button");

profileInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, profileForm);
    } else {
      hideInputError(input, profileForm);
    }
    toggleButtonState(profileButton, profileInputs);
  });
});

profileForm.addEventListener("submit", (event) => {
  let formValid = true;

  profileInputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, profileForm);
      formValid = false;
    }
  });
  toggleButtonState(profileButton, profileInputs);
  if (!formValid) {
    event.preventDefault();
  }
});

const newLocalForm = document.querySelector("#new-card-form");
const newLocalInputs = newLocalForm.querySelectorAll(".popup__input");
const newLocaltButton = newLocalForm.querySelector(".popup__button");

newLocalInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, newLocalForm);
    } else {
      hideInputError(input, newLocalForm);
    }
    toggleButtonState(newLocaltButton, newLocalInputs);
  });
});

newLocalForm.addEventListener("submit", (event) => {
  let formValid = true;

  newLocalInputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, newLocalForm);
      formValid = false;
    }
  });
  toggleButtonState(newLocaltButton, newLocalInputs);
  if (!formValid) {
    event.preventDefault();
  }
});
toggleButtonState(newLocaltButton, newLocalInputs);

// close popup esc and clicking outisde

document.addEventListener("mousedown", (event) => {
  const openedPopup = document.querySelector(".popup_is-opened");

  // if there isn't a pop up open do nothing
  if (!openedPopup) return;

  // if they click on the overlay (external part)
  if (event.target === openedPopup) {
    closeModal(openedPopup);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closeModal(openedPopup);
  }
});

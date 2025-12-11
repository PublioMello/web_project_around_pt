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

function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
}

function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
}

closeProfile.addEventListener("click", function () {
  closeModal(modal);
});

// Discover the current values and displayed in the popup
const currentName = document.querySelector(".profile__title");
const currenDescription = document.querySelector(".profile__description");

function handleOpenEditModal() {
  document.querySelector(".popup__input_type_name").value =
    currentName.textContent;
  document.querySelector(".popup__input_type_description").value =
    currenDescription.textContent;

  openModal(modal);
}

editProfile.addEventListener("click", function () {
  handleOpenEditModal();
});

// Find the Form and edit the values after submit
let formElement = document.querySelector(".popup__content");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector(".popup__input_type_name");
  let jobInput = formElement.querySelector(".popup__input_type_description");

  currentName.textContent = nameInput.value;
  currenDescription.textContent = jobInput.value;
  closeModal(modal);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// Ceating card elements
const template = document.querySelector("#cards__template");
const cardsContainer = document.querySelector(".cards__list");

function getCardElement(
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

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

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

const profileForm = document.querySelector("#edit-profile-form");
const profileInputs = profileForm.querySelectorAll(".popup__input");
const profileButton = profileForm.querySelector(".popup__button");

function showInputError(inputElement, errorMessage, formElected) {
  const errorElement = formElected.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(inputElement, formElected) {
  const errorElement = formElected.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}

function hasInvalidInput(inputs) {
  return Array.from(inputs).some((input) => !input.validity.valid);
}

function toggleButtonState(defineButton, inputs) {
  if (hasInvalidInput(inputs)) {
    defineButton.disabled = true;
    defineButton.classList.add("form__button_disabled");
  } else {
    defineButton.disabled = false;
    defineButton.classList.remove("form__button_disabled");
  }
}

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

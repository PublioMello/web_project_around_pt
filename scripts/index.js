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

// Discover the current values and displayed in the popup
const currentName = document.querySelector(".profile__title");
const currenDescription = document.querySelector(".profile__description");

function handleOpenEditModal() {
  document.querySelector(".popup__input_type_name").value =
    currentName.textContent;
  document.querySelector(".popup__input_type_description").value =
    currenDescription.textContent;

  modal.classList.add("popup_is-opened");
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
  modal.classList.remove("popup_is-opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);

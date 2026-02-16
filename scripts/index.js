import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Api from "./API.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

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

// ========== Using the Request ==========
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "9850811a-ab44-49ce-bac4-b519a93e9c0c",
    "Content-Type": "application/json",
  },
});

const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

api.getTheName().then((user) => {
  profileName.textContent = user.name;
  profileAbout.textContent = user.about;
  profileAvatar.src = user.avatar;
});

// ========== POPUP IMAGE ==========
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// ========== USER INFO ==========

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

// ========== POPUP EDIT PROFILE ==========

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit,
);
editProfilePopup.setEventListeners();

// ========== POPUP ADD CARD ==========
const addCardPopup = new PopupWithForm(
  "#new-card-popup",
  handleAddCardFormSubmit,
);
addCardPopup.setEventListeners();

// ========== SECTION CARDS ==========

const cardList = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardList.addItem(card);
    },
  },
  ".cards__list",
);

// ========== VALIDATOR ==========
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const editProfileValidator = new FormValidator(editProfileForm);
const newCardValidator = new FormValidator(newCardForm);

editProfileValidator.enableValidation();
newCardValidator.enableValidation();

// ========== FUNCTIONS ==========
let currentUserId;

Promise.all([api.getTheName(), api.getInitialCards()])
  .then(([user, cards]) => {
    currentUserId = user._id;
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });
    profileAvatar.src = user.avatar;

    cardList.setItems(cards);
    cardList.renderItems();
  })
  .catch((err) => console.log(err));

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#cards__template",
    (cardData) => {
      imagePopup.open(cardData);
    },
    (cardID) => {
      api
        .addLike(cardID)
        .then(() => {
          debugger;
          card._setLiked(true);
        })
        .catch((err) => console.log(err));
    },
    (cardID) => {
      api
        .removeLike(cardID)
        .then(() => {
          card._setLiked(false);
        })
        .catch((err) => console.log(err));
    },
    currentUserId,
  );

  return card.generateCard();
}

function handleProfileFormSubmit(formData) {
  api
    .editarDados(formData.name, formData.description)
    .then((user) => {
      userInfo.setUserInfo({ name: user.name, about: user.about });
      profileAvatar.src = user.avatar;
      editProfilePopup.close();
    })
    .catch((err) => console.log(err));
}

function handleAddCardFormSubmit(formData) {
  api
    .addNewCard(formData["place-name"], formData.link)
    .then((cardData) => {
      const newCard = createCard(cardData);
      cardList.addItem(newCard);
      addCardPopup.close();
    })
    .catch((err) => console.log(err));
}

// ========== EVENT LISTENERS ==========

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();

    document.querySelector("[name='name']").value = currentUserInfo.name;
    document.querySelector("[name='description']").value =
      currentUserInfo.about;

    editProfileValidator.resetValidation();
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardValidator.resetValidation();

  addCardPopup.open();
});

// document.querySelector(".card__delete-button").addEventListener("click", () => {
//   debugger;
//   addCardPopup.open();
// });

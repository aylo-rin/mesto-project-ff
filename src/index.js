import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  handleLikeCard,
  handleDeleteCard,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  setEventListenerClose,
} from "./components/modal.js";

const container = document.querySelector(".places");
const cardContainer = container.querySelector(".places__list");
const formElement = document.querySelector(".popup__form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const saveNewCardButton = addCardPopup.querySelector(".popup__button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const imagePopup = document.querySelector(".popup_type_image");

setEventListenerClose(addCardPopup);
setEventListenerClose(editProfilePopup);
setEventListenerClose(imagePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

formElement.addEventListener("submit", handleFormSubmit);

function setEventListener(button, popup) {
  button.addEventListener("click", function () {
    openPopup(popup);

    if (popup === editProfilePopup) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileJob.textContent;
    }
  });
}

setEventListener(addCardButton, addCardPopup);
setEventListener(editProfileButton, editProfilePopup);

function handleImageClick(link, name) {
  const popupPhoto = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupPhoto.src = link;
  popupPhoto.alt = name;
  popupCaption.textContent = name;

  openPopup(imagePopup);
}

function addCard(name, link) {
  const newCard = createCard(
    { name, link },
    { handleDeleteCard, handleLikeCard, handleImageClick }
  );
  cardContainer.prepend(newCard);
}

saveNewCardButton.addEventListener("click", function (event) {
  event.preventDefault();

  addCard(cardNameInput.value, cardLinkInput.value);

  cardNameInput.value = "";
  cardLinkInput.value = "";

  closePopup(addCardPopup);
});

function addInitialCard(card) {
  cardContainer.append(
    createCard(card, { handleDeleteCard, handleLikeCard, handleImageClick })
  );
}

function renderInitialCard() {
  initialCards.forEach(addInitialCard);
}

renderInitialCard();

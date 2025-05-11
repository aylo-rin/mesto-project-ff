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
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const inputEditProfileName = document.querySelector(".popup__input_type_name");
const inputEditProfileJob = document.querySelector(".popup__input_type_description");

const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_url");

const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputEditProfileName.value;
  profileJob.textContent = inputEditProfileJob.value;
  closePopup(popupEditProfile);
}

function setEventListenerOpenPopupProfile(button, popup) {
  button.addEventListener("click", function () {
    inputEditProfileName.value = profileName.textContent;
    inputEditProfileJob.value = profileJob.textContent;
    openPopup(popup);
  });
}

function handleImageClick(link, name) {
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageCaption.textContent = name;

  openPopup(popupImage);
}

function addCard(name, link) {
  const newCard = createCard(
    { name, link },
    { handleDeleteCard, handleLikeCard, handleImageClick }
  );
  cardContainer.prepend(newCard);
}

function addInitialCard(card) {
  cardContainer.append(
    createCard(card, { handleDeleteCard, handleLikeCard, handleImageClick })
  );
}

function renderInitialCard() {
  initialCards.forEach(addInitialCard);
}

renderInitialCard();

setEventListenerClose(popupAddCard);
setEventListenerClose(popupEditProfile);
setEventListenerClose(popupImage);

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);

setEventListenerOpenPopupProfile(buttonEditProfile, popupEditProfile);
buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault();

  addCard(inputCardName.value, inputCardLink.value);

  formAddCard.reset();

  closePopup(popupAddCard);
});

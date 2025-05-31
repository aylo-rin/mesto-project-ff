import "./pages/index.css";
import { createCardElement, handleLikeClick } from "./components/card.js";
import {
  openPopup,
  closePopup,
  setEventListenerClose,
} from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./components/validation.js";
import {
  getInitialCards,
  getUserInfo,
  editProfileInfo,
  addNewCard,
  deleteCard,
  addLike,
  removeLike,
  editProfileAvatar,
} from "./components/api.js";

const container = document.querySelector(".places");
const cardsContainer = container.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const profileImageEditPopup = document.querySelector(".popup_type_edit-image");
const formEditProfileImage =
  profileImageEditPopup.querySelector(".popup__form");
const inputEditProfileImage = document.querySelector(
  ".popup__image_input_type_url"
);
const submitEditProfileImageButton = formEditProfileImage.querySelector('.popup__button');

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const inputEditProfileName = document.querySelector(".popup__input_type_name");
const inputEditProfileAbout = document.querySelector(
  ".popup__input_type_description"
);
const submitEditProfileButton = formEditProfile.querySelector('.popup__button');

const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_url");
const submitAddCardButton = formAddCard.querySelector('.popup__button');

const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const popupCardDeletion = document.querySelector(".popup_type_card-delete");
const popupCardDeletionButton = popupCardDeletion.querySelector(
  ".popup__button-delete"
);

let cardToDelete;
let userId;

function handleImageClick(link, name) {
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

function handleBinClick(cardElement, cardId) {
  cardToDelete = {
    element: cardElement,
    _id: cardId,
  };
  openPopup(popupCardDeletion);
}

function addCard(name, link) {
  submitAddCardButton.textContent = 'Сохранение...';
  addNewCard(name, link)
    .then((card) => {
      const newCard = createCardElement(card, userId, {
        handleImageClick,
        handleBinClick,
        handleLikeClick: (cardElement, cardId, isLiked) => 
          handleLikeClick(cardElement, cardId, isLiked, addLike, removeLike)
      });
      cardsContainer.prepend(newCard);
    })
    .catch((err) => console.error("Ошибка:", err))
    .finally(() => {
      submitAddCardButton.textContent = 'Сохранить';
    });
}

function addInitialCard(card) {
  cardsContainer.append(
    createCardElement(card, userId, {
      handleImageClick,
      handleBinClick,
      handleLikeClick: (cardElement, cardId, isLiked) => 
        handleLikeClick(cardElement, cardId, isLiked, addLike, removeLike)
    })
  );
}

function renderInitialCard(cards) {
  cards.forEach(addInitialCard);
}

function handleEditProfileImageSubmit(evt) {
  evt.preventDefault();

  submitEditProfileImageButton.textContent = 'Сохранение...';

  editProfileAvatar(inputEditProfileImage.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${inputEditProfileImage.value})`;
      closePopup(profileImageEditPopup);
      evt.target.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      submitEditProfileImageButton.textContent = 'Сохранить';
    });
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  
  submitEditProfileButton.textContent = 'Сохранение...';
  
  editProfileInfo(inputEditProfileName.value, inputEditProfileAbout.value)
    .then(() => {
      profileName.textContent = inputEditProfileName.value;
      profileAbout.textContent = inputEditProfileAbout.value;
      closePopup(popupEditProfile);
      formEditProfile.reset();
      clearValidation(formEditProfile, validationConfig);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitEditProfileButton.textContent = 'Сохранить';
    });
}

function setEventListenerOpenPopupProfile(button, popup) {
  button.addEventListener("click", function () {
    inputEditProfileName.value = profileName.textContent;
    inputEditProfileAbout.value = profileAbout.textContent;
    clearValidation(formEditProfile, validationConfig);
    openPopup(popup);
  });
}

profileImage.addEventListener("click", () => {
  formEditProfileImage.reset();
  clearValidation(formEditProfileImage, validationConfig);
  openPopup(profileImageEditPopup);
});

profileImageEditPopup.addEventListener("submit", handleEditProfileImageSubmit);

formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
setEventListenerOpenPopupProfile(buttonEditProfile, popupEditProfile);

buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));

popupCardDeletionButton.addEventListener("click", () => {
  deleteCard(cardToDelete._id).then(() => {
    cardToDelete.element.remove();
    closePopup(popupCardDeletion);
  });
});

formAddCard.addEventListener("submit", function (event) {
  event.preventDefault();
  addCard(inputCardName.value, inputCardLink.value)
  formAddCard.reset();
  closePopup(popupAddCard);
  clearValidation(formAddCard, validationConfig);
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    renderInitialCard(cardsData);
  })
  .catch((err) => console.error("Ошибка:", err));

setEventListenerClose(popupAddCard);
setEventListenerClose(popupEditProfile);
setEventListenerClose(popupImage);
setEventListenerClose(popupCardDeletion);
setEventListenerClose(profileImageEditPopup);

enableValidation(validationConfig);

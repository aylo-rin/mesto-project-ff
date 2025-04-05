const container = document.querySelector(".places");
const cardContainer = container.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const newCardPopUp = document.querySelector(".popup_type_new-card");
const closeCardButton = newCardPopUp.querySelector(".popup__close");
const saveNewCardButton = newCardPopUp.querySelector(".popup__button");
const cardTemplate = document.querySelector("#card-template").content;
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

addCardButton.addEventListener("click", function () {
  newCardPopUp.classList.add("popup_is-opened");
});

closeCardButton.addEventListener("click", function () {
  newCardPopUp.classList.remove("popup_is-opened");

  cardNameInput.value = "";
  cardLinkInput.value = "";
});

function likeCard(cardElement) {
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("card__like-button_is-active");
    });
}

function deleteCard(cardElement) {
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });
}

function createCard(item, { deleteCard, likeCard }) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  likeCard(cardElement);
  deleteCard(cardElement);

  return cardElement;
}

function addCard(name, link) {
  const newCard = createCard({ name, link }, { deleteCard, likeCard });
  cardContainer.append(newCard);
}

saveNewCardButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (!cardNameInput.value || !cardLinkInput.value) {
    alert("Пожалуйста, заполните все поля ввода");
    return;
  }

  addCard(cardNameInput.value, cardLinkInput.value);

  cardNameInput.value = "";
  cardLinkInput.value = "";

  newCardPopUp.classList.remove("popup_is-opened");
});

function renderInitialCards() {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

renderInitialCards();
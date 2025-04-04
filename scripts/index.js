const container = document.querySelector(".places");
const cardContainer = container.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const newCardPopUp = document.querySelector(".popup_type_new-card");
const closeCardButton = newCardPopUp.querySelector(".popup__close");
const saveNewCardButton = newCardPopUp.querySelector(".popup__button");

addCardButton.addEventListener("click", function () {
  newCardPopUp.classList.add("popup_is-opened");
});

closeCardButton.addEventListener("click", function () {
  newCardPopUp.classList.remove("popup_is-opened");
});

function addCard(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("card__like-button_is-active");
    });

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });

  cardContainer.append(cardElement);
}

saveNewCardButton.addEventListener("click", function () {
  const name = document.querySelector(".popup__input_type_card-name");
  const link = document.querySelector(".popup__input_type_url");
  newCardPopUp.classList.remove("popup_is-opened");

  addCard(name.value, link.value);

  name.value = "";
  link.value = "";
});

function renderInitialCards() {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

renderInitialCards();
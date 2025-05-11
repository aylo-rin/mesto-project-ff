export function createCard(
  item,
  { handleDeleteCard, handleLikeCard, handleImageClick }
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardImage.addEventListener("click", () =>
    handleImageClick(item.link, item.name)
  );

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeCard);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => handleDeleteCard(cardElement));

  return cardElement;
}

export function handleLikeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function handleDeleteCard(cardElement) {
  cardElement.remove();
}

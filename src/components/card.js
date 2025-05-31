export function createCardElement(
  cardData,
  userId,
  { handleImageClick, handleBinClick, handleLikeClick }
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const titleElement =cardElement.querySelector(".card__title");
  const imageElement = cardElement.querySelector(".card__image");
  const deletionButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__like-counter");

  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  likesCounter.textContent = cardData.likes.length;

  imageElement.addEventListener("click", () =>
    handleImageClick(cardData.link, cardData.name)
  );

  const isLiked = cardData.likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (userId !== cardData.owner._id) {
    deletionButton.remove();
  } else {
    deletionButton.addEventListener("click", () =>
      handleBinClick(cardElement, cardData._id)
    );
  }

  likeButton.addEventListener("click", () => {
    const currentLikeStatus = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    handleLikeClick(cardElement, cardData._id, currentLikeStatus);
  });

  return cardElement;
}

export function handleLikeClick(cardElement, cardId, isLiked, addLike, removeLike) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__like-counter");

  let likeAction;
  if (isLiked) {
    likeAction = removeLike(cardId);
  } else {
    likeAction = addLike(cardId);
  }

  likeAction
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      likesCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка: ", err);
    });
}
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

export function setEventListenerClose(popup) {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });

  popup.addEventListener("mousedown", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  });
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

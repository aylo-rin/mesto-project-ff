const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "4b62157a-0c8c-4f02-bc6c-191aeb6b6b0f",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
}

export function editProfileInfo(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then(handleResponse);
}

export function addNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(handleResponse);
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

export function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

export function editProfileAvatar(userAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatar,
    }),
  }).then(handleResponse);
}

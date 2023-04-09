export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl; //'https://mesto.nomoreparties.co/v1/cohort-62
    this._headers = config.headers;
  }

  _checkResponse () {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получаем все карточки с сервера
  getInitialCards () {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  // создаем новую карточку (POST)
  addNewCard(body) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then(this._checkResponse);
  }


  // • получить данные пользователя (GET)
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
  //
  // • заменить данные пользователя (PATCH)
  changeUserInfo(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then(this._checkResponse);
  }
  // • заменить аватар (PATCH)
  changeAvatar(body) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then(this._checkResponse);
  }
  // • “залайкать” карточку (PUT)
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  // • удалить карточку (DELETE)
  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);

}

  }


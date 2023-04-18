class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        //this.authorization = headers.authorization;
    };

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    //получаем карточки
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers,
        })
            .then((res) => this._checkResponse(res));
    };  

    //получаем данные пользователя
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        })
           .then((res) => this._checkResponse(res));
    };  

    //изменение данных пользователя
    changeUserInfo(userData) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,

            body: JSON.stringify({
                name: userData.name,
                about: userData.work,
            }),
        })
        .then((res) => this._checkResponse(res));
    };

    //создание карточки
    addCard(card) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            'Content-Type': 'application/json',

            body: JSON.stringify({
                name: card.title,
                link: card.link,
            }),
        })
        .then((res) => this._checkResponse(res));
    };

    //лайк карточки
    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
            'Content-Type': 'application/json',
        })
        .then((res) => this._checkResponse(res));
    };

    //удаление лайка
    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
            'Content-Type': 'application/json',
        })
        .then((res) => this._checkResponse(res));
    };

    //удаление карточки
    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this.headers,
          'Content-Type': 'application/json',
        })
        .then((res) => this._checkResponse(res));
      }

    //изменение аватара
    changeAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this.headers,
            'Content-Type': 'application/json',
          
            body: JSON.stringify({
                avatar: data.link,
            }),
        })
        .then((res) => this._checkResponse(res));
      } 
};

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: '15144cc9-7b57-4999-8446-a83117a0b7b6',
        'Content-Type': 'application/json'
    },
});

export default api;
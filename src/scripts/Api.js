export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    };

    

    //получаем карточки
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    };  

    //получаем данные пользователя
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    };  

    //изменение данных пользователя
    changeUserInfo(userData) {
        return fetch(`${this.baseUrl}c`, {
            method: 'PATCH',
            headers: this.headers,

            body: JSON.stringify({
                name: userData.name,
                about: userData.work,
            }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
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
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    };

    //лайк карточки
    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
            'Content-Type': 'application/json',
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    };

    //удаление лайка
    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
            'Content-Type': 'application/json',
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    };

    //удаление карточки
    deleteCard(cardId) {
        console.log(cardId);
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this.headers,
          'Content-Type': 'application/json',
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
      }

    //изменение аватара
    changeAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this.headers,
            'Content-Type': 'application/json',
          
            body: JSON.stringify({
                avatar: avatar.newAvatar,
            }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
      }

   
}
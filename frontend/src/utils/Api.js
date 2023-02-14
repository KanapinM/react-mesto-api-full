export class Api {
    #onResponse(response) {//не совсем понял ккомментарий onResponse => onResponse
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(console.error(`Возникла ошибка, код - ${response.status}`));
    }

    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this.credentials = config.credentials;
    }

    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then(this.#onResponse)
    }

    editUserData(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this.credentials,
            body: JSON.stringify(data),
        })
            .then(this.#onResponse)
    }

    changeAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this.credentials,
            body: JSON.stringify({
                avatar: url,
            }),
        })
            .then(this.#onResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then(this.#onResponse)
    };

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: this.credentials,
            body: JSON.stringify(data),
        })
            .then(this.#onResponse)
    }

    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then(this.#onResponse)
    }

    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then(this.#onResponse)
    }

    unlikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then(this.#onResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
    }
}

// const api = new Api({
//     url: 'https://mesto.nomoreparties.co/v1/cohort-52',
//     headers: {
//         'Content-Type': 'application/json',
//         authorization: 'e0b445b1-a635-48e2-bbd4-c08ec3e337e5'
//     },
// });
const api = new Api({
    url: 'https://api.mkmesto.nomoredomains.work',
    headers: {
        'Content-Type': 'application/json',
        // authorization: '3249fd8a9a9b728c91370877b91d437f726d199291890896dd5e838f6794f31d'
    },
    credentials: "include",
});

export default api;

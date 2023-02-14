export const options = {
    // URL: 'https://auth.nomoreparties.co',
    URL: 'https://api.mkmesto.nomoredomains.work',
    method: 'POST',
    credentials: "include",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

class Auth {
    constructor(options) {
        this._URL = options.URL;
        this._headers = options.headers;
        this.credentials = options.credentials;
    }

    _response(res) {
        if (!res.ok) {
            console.log(res.status);
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    signup(email, password) {
        return fetch(`${this._URL}/signup`, {
            method: 'POST',
            headers: this._headers,
            credentials: this.credentials,
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        })
            .then((res) => {
                return this._response(res);
            })
            .then((data) => {
                // localStorage.setItem('token', data.token);
                console.log(data);
                return data;
            });
    }

    signin(email, password) {
        return fetch(`${this._URL}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: this.credentials,
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then((res) => {
                return this._response(res);
            })
            .then((data) => {
                // if (data.token) {
                //     localStorage.setItem('jwt', data.token);
                //     return data;
                // }
                document.cookie = data.token;
                console.log(document.cookie);
                console.log(data);
                return data;
            })
    }

    checkToken() {
        return fetch(`${this._URL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${jwt}`,
            },
            credentials: this.credentials
        })
            .then((res) => {
                return this._response(res);
            })
    }

}

const auth = new Auth(options);

export default auth;
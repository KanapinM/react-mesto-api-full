import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onSubmit }) {

    const [userData, setUserData] = React.useState({
        email: "",
        password: "",
    });

    function handleRegister(email, password) {
        onSubmit(email, password);
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    function handleSubmit(evt) {
        evt.preventDefault();

        if (!userData.password) {
            return;
        }
        const { email, password } = userData;
        handleRegister(email, password);

    }


    return (
        <div className="user__container">
            <h2 className="user__title">
                Регистрация
            </h2>

            <form onSubmit={handleSubmit} className="user__form">
                <input
                    onChange={handleChange}
                    className="user__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    onChange={handleChange}
                    className="user__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required
                />
                <button type="submit" className="user__submit-button">
                    Зарегистрироваться
                </button>
                <p className="user__are-registered">
                    Уже зарегистрированы? &nbsp;
                    <Link to="/signin" className="user__are-registrated_type_link">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;

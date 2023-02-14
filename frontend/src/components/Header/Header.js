import React from 'react';
import logo from '../../images/mesto.svg';
import { Switch, Route, Link } from "react-router-dom";

function Header(props) {

    return (
        <div className="header">
            <img
                className="header__logo"
                src={logo}
                alt="текстовый логтип Место Раша"
            />

            <Switch>
                <Route path={"/signin"}>
                    <Link
                        to="/signup"
                        className="header__href">
                        Регистрация
                    </Link>
                </Route>

                <Route path={"/signup"}>
                    <Link to="/signin" className="header__href">
                        Войти
                    </Link>
                </Route>

                <Route path="/">
                    <div className="header__container">
                        <p className="header__email">{props.email}</p>
                        <button
                            onClick={props.onQuit}
                            className="header__quit-button">
                            Выйти
                        </button>
                    </div>
                </Route>
            </Switch>

        </div>
    );
}

export default Header;


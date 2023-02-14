import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Card from '../Card/Card';

function Main(props) {
    const userData = React.useContext(CurrentUserContext);

    return (
        <>
            <section className="profile">
                <div className="profile__column">
                    <div
                        onClick={props.onEditAvatar}
                        style={{ backgroundImage: `url(${userData ? userData.avatar : ''})` }}
                        className="profile__avatar"
                    />
                    <div className="profile__info">
                        <div className="profile__edit">
                            <h1 className="profile__name">
                                {userData ? userData.name : 'Идентификация...'}
                            </h1>
                            <button
                                onClick={props.onEditProfile}
                                type="button" aria-label="edit"
                                className="profile__edit-button"
                            />
                        </div>
                        <p className="profile__about">
                            {userData ? userData.about : 'Получение данных...'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={props.onAddPlace}
                    type="button"
                    aria-label="add"
                    className="profile__add-button"
                />
            </section>

            <div className="cardsContainer">
                {props.cards.map(({ ...card }) =>
                    <Card
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardAgreement={props.onCardAgreement}
                        card={card}
                        key={card._id}
                        {...card}
                    />
                )}
            </div>
        </>
    );
}

export default Main;
import React from 'react';
import PopupWithForm from '../Popup/PopupWithForm/PopupWithForm';

function AgreementPopup(props) {
    function handleCardDelete(e) {
        e.preventDefault();
        props.onCardDelete(props.card);
    }

    return (
        <PopupWithForm
            isOpen={props.isAgreementPopupOpen}
            onClose={props.onClose}
            name="agreement"
            title="Вы уверены?"
            buttonText="Да"
            onSubmit={handleCardDelete}
        >
        </PopupWithForm>
    )
}

export default AgreementPopup;
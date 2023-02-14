import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_open' : ''}`} >
            <button
                onClick={props.onClose}
                type="reset"
                className="popup__close-button"
            />
            <div className="popup__container">
                <h2 className="popup__title">
                    {props.title}
                </h2>

                <form onSubmit={props.onSubmit} className="popup__form">
                    {props.children}
                    <button type="submit" className="popup__submit-button">
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
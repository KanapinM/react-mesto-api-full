import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card ? 'popup_open' : ''}`} >
            <div className="popup__container-image">
                <button
                    onClick={props.onClose}
                    type="button"
                    className="popup__close-button popup__close-button_image"
                />
                <img
                    className="popup__place-image"
                    src={props.card?.link}
                    alt={props.card?.name} name="link"
                />
                <p className="popup__place-name">
                    {props.card?.name}
                </p>
            </div>
        </div>
    );
}

export default ImagePopup;
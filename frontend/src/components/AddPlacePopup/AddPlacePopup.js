import React from 'react';
import PopupWithForm from '../Popup/PopupWithForm/PopupWithForm';

function AddPlacePopup(props) {
    const cardNameRef = React.useRef();
    const cardLinkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: cardNameRef.current.value,
            link: cardLinkRef.current.value
        });
    }

    React.useEffect(() => {
        cardNameRef.current.value = '';
        cardLinkRef.current.value = '';
    }, [props.isAddPlacePopupOpen]);

    return (
        <PopupWithForm
            isOpen={props.isAddPlacePopupOpen}
            onClose={props.onClose}
            name="add-place"
            title="Новое место"
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                ref={cardNameRef}
                className="popup__input popup__input_type_place"
                id="place-input"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
            />
            <span className="popup__input-error place-input-error" />

            <input
                type="url"
                name="link"
                ref={cardLinkRef}
                className="popup__input popup__input_type_photo"
                id="href-input"
                required
                placeholder="Ссылка на картинку"
            />
            <span className="popup__input-error href-input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;
import React from 'react';
import PopupWithForm from '../Popup/PopupWithForm/PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isEditAvatarPopupOpen]);

    return (
        <PopupWithForm
            isOpen={props.isEditAvatarPopupOpen}
            onClose={props.onClose}
            name="avatar"
            title="Обновить аватар"
            buttonText="Cохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="link" ref={avatarRef}
                className="popup__input popup__input_type_avatar"
                id="href1-input"
                required
                placeholder="Ссылка на картинку"
            />
            <span className="popup__input-error href1-input-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
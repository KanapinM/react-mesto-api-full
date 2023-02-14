import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../Popup/PopupWithForm/PopupWithForm';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [values, inputsValues] = React.useState({});

    React.useEffect(() => {
        inputsValues({
            name: currentUser ? currentUser.name : '',
            about: currentUser ? currentUser.about : ''
        })
    }, [currentUser, props.isEditProfilePopupOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(values);
    }

    function handleChange(evt) {
        inputsValues({
            ...values,
            [evt.target.name]: evt.target.value,
        })
    }

    return (
        <PopupWithForm
            isOpen={props.isEditProfilePopupOpen}
            onClose={props.onClose}
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                onChange={handleChange}
                value={values.name || ''}
                className="popup__input popup__input_type_name"
                id="name-input"
                placeholder="Ваше Имя"
                required
                minLength="2"
                maxLength="40"
                name="name"
            />
            <span className="popup__input-error name-input-error" />

            <input
                type="text"
                onChange={handleChange}
                value={values.about || ''}
                className="popup__input popup__input_type_about"
                id="about-input"
                placeholder="Интересы"
                required
                minLength="2"
                maxLength="200"
                name="about"
            />
            <span className="popup__input-error about-input-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;
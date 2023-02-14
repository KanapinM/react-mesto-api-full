import React from 'react';

function Login({ onSubmit, ...props }) {

    const [userData, setUserData] = React.useState({
        email: "",
        password: "",
    });

    function handleLogin(email, password) {
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
        handleLogin(email, password);
    }


    return (
        <div className="user__container">
            <h2 className="user__title">
                Вход
            </h2>
            <form
                onSubmit={handleSubmit}
                className="user__form">

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
                <button
                    type="submit"
                    className="user__submit-button">
                    Войти
                </button>

            </form>
        </div>


        // <section className="sign sign-in">
        //     <div className="sign__container">
        //         <h2 className="sign__title">Вход</h2>

        //         <form
        //             // onSubmit={handleSubmit}
        //             className="sign__form sign__form-entrance"
        //             action="formEntrance"
        //             name="formEntrance"
        //         >
        //             <input
        //                 // onChange={handleChange}
        //                 className="sign__text sign__text-entrance-email"
        //                 id="email-entrance-input"
        //                 type="email"
        //                 name="email"
        //                 placeholder="Email"
        //                 required
        //             />
        //             <div className="sign__text-block">
        //                 <span className="sign__text-error email-input-error"></span>
        //             </div>
        //             <input
        //                 // onChange={handleChange}
        //                 className="sign__text sign__text-entrance-password"
        //                 id="password-entrance-input"
        //                 type="password"
        //                 name="password"
        //                 placeholder="Пароль"
        //                 required
        //             />
        //             <div className="sign__text-block">
        //                 <span className="sign__text-error password-input-error"></span>
        //             </div>

        //             <button
        //                 className="sign__actions sign-entrance__actions"
        //                 type="submit"
        //             >
        //                 Войти
        //             </button>
        //         </form>
        //     </div>
        // </section>
    );
}

export default Login;

import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/Api';
import auth from '../utils/Auth';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';
import ImagePopup from '../components/Popup/ImagePopup/ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from '../components/EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup/AddPlacePopup';
import AgreementPopup from '../components/AgreementPopup/AgreementPopup';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAgreementPopupOpen, setIsAgreementPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccessTooltipStatus, setTooltipStatus] = React.useState(false);

  React.useEffect(() => {
    checkToken();
  }, []);
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          // setCards(cards);
          setCards(cards.reverse().map((card) => card));
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAgreementClick(card) {
    setIsAgreementPopupOpen(true);
    setCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((cards) => cards._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }
  function handleUpdateUser(dataUser) {
    api
      .editUserData(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }
  function handleUpdateAvatar(dataAvatar) {
    api
      .changeAvatar(dataAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }
  function handleAddPlace(newCard) {
    api
      .addCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleLogin(email, password) {
    auth
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
        openTooltip(false);
      });
  }

  function handleRegister(email, password) {
    auth
      .signup(email, password)
      .then((data) => {
        if (data) {
          setEmail(email);
          openTooltip(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
        openTooltip(false);
      });
  }

  function onQuit() {
    document.cookie = undefined;
    console.log(document.cookie);
    setLoggedIn(false);
  }

  function checkToken() {
    if (document.cookie !== undefined) {
      return auth
        .checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function openTooltip(boolean) {
    setInfoTooltipOpen(true);
    setTooltipStatus(boolean);
  };


  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAgreementPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onQuit={onQuit}
        />

        <Switch>
          <Route path="/signup">
            <Register auth={auth} onSubmit={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login auth={auth} onSubmit={handleLogin} />
          </Route>

          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardAgreement={handleAgreementClick}
          />
        </Switch>

        <Footer />

        <EditProfilePopup
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AgreementPopup
          isAgreementPopupOpen={isAgreementPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={card}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isSuccessTooltipStatus={isSuccessTooltipStatus}
          isInfoTooltipOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider >

  );
}

export default App;
import {createNewCard} from '../pages/index.js'
export default class Api {
  constructor(profileName, profileSubname, avatar){
    this.profileName = profileName,
    this.profileSubname = profileSubname
    this.avatar = avatar;
  }
  //Начальные карточки и данные профиля
  getInitialInfo() {
   const cards = fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
    method: 'GET',
    headers: {
      authorization: '25506122-31ea-41ea-9643-f48e75424308'
    }
    }).then(res => {return this._checkResponse(res)}).then(res => {return res.json()})
    .catch(err => console.log(err));

   const profileData = fetch('https://nomoreparties.co/v1/cohort-40/users/me',
    {method: 'GET',
      headers: {
      authorization: '25506122-31ea-41ea-9643-f48e75424308'
     }
    }).then(res => {return this._checkResponse(res)}).then(res => {return res.json()})
    .catch(err => console.log(err));

    return Promise.all([cards, profileData]).then(res => {return res});

  }
  //Изменение данных профиля
  changeProfileData(name, subname, userInfo, editProfileButtonReset, popupProfileClose) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
    method: 'PATCH',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
                   'Content-Type': 'application/json'
     },
    body: JSON.stringify({
      name: name,
      about: subname
    })
    }).then(res => {return this._checkResponse(res).json()})
    .then(res => {userInfo.setUserInfo(res);})
    .then(popupProfileClose)
    .catch(err => console.log(err))
    .finally(editProfileButtonReset)
  }
  createCard({name, link}, popupAddButtonReset, popupAddClose) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
    method: 'POST',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: name,
    link: link
  })
  }).then(res => {return this._checkResponse(res).json()})
  .then(obj => createNewCard(obj))
  .then(popupAddClose)
  .catch(err => console.log(err))
  .finally(popupAddButtonReset)
  }
  //Постановка лайка
  setLike(cardId, counter, handleLike, evt, setAmount) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: this.profileName.textContent,
    about: this.profileSubname.textContent
  })
  }).then(res => {return this._checkResponse(res).json()}
  ).then(res => {
    setAmount(counter, res.likes.length);
    handleLike(evt);
  })
   .catch(err => console.log(err))
  }
  unsetLike(cardId, counter, handleLike, evt, setAmount) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
    'Content-Type': 'application/json'
    }
  }).then(res => {return this._checkResponse(res).json()})
    .then(res => {
      setAmount(counter, res.likes.length);
      handleLike(evt);
    })
    .catch(err => console.log(err))
  }
  deleteCard(cardId, card, resetPopupDelete, deleteClose){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
    'Content-Type': 'application/json'
      }
    }
    ).then(res => {return this._checkResponse(res).json()})
     .then(() => card.remove())
     .then(deleteClose)
     .catch(err => console.log(err))
     .finally(resetPopupDelete)
  }
  changeAvatar(avatarUrl, saveReset, popupAvatarClose){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '25506122-31ea-41ea-9643-f48e75424308',
      'Content-Type': 'application/json'
        },
    body: JSON.stringify({
    avatar: avatarUrl
  })
  }).then(res => {return this._checkResponse(res).json()})
  .then(res => this.avatar.src = res.avatar)
  .then(popupAvatarClose)
  .catch(err => console.log(err))
  .finally(saveReset);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res
    }
  }
}

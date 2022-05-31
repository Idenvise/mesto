export default class Api {
  constructor(profileName, profileSubname){
    this.profileName = profileName,
    this.profileSubname = profileSubname
  }
  //Начальные карточки и данные профиля
  getInitialCards() {
   return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
    method: 'GET',
    headers: {
      authorization: '25506122-31ea-41ea-9643-f48e75424308'
    }
    }).then(res => {return this._checkResponse(res).json()})
  }
  getProfileInfo(){
   return fetch('https://nomoreparties.co/v1/cohort-40/users/me',
    {method: 'GET',
      headers: {
      authorization: '25506122-31ea-41ea-9643-f48e75424308'
     }
    }).then(res => {return this._checkResponse(res).json()})
  }
  //Изменение данных профиля
  changeProfileData(name, subname) {
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
  }
  createCard({name, link}) {
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
  }
  //Постановка лайка
  setLike(cardId) {
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
  }).then(res => {return this._checkResponse(res).json()})
  }
  unsetLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
    'Content-Type': 'application/json'
    }
  }).then(res => {return this._checkResponse(res).json()})
  }
  deleteCard(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
    'Content-Type': 'application/json'
      }
    }
    ).then(res => {return this._checkResponse(res).json()})
  }
  changeAvatar(avatarUrl){
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
  }
  _checkResponse(res) {
    if (res.ok) {
      return res
    }
  }
}

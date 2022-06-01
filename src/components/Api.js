export default class Api {
  constructor(profileName, profileSubname, config){
    this.profileName = profileName,
    this.profileSubname = profileSubname,
    this.config = config
  }
  //Начальные карточки и данные профиля
  getInitialCards() {
   return fetch(`${this.config.baseUrl}/cards`, {
    method: 'GET',
    headers: this.config.headers
    }).then(res => {return this._checkResponse(res)})
  }
  getProfileInfo(){
   return fetch(`${this.config.baseUrl}/users/me`, {
     method: 'GET',
     headers: this.config.headers
    }).then(res => {return this._checkResponse(res)})
  }
  //Изменение данных профиля
  changeProfileData(name, subname) {
    return fetch(`${this.config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this.config.headers,
    body: JSON.stringify({
      name: name,
      about: subname
    })
    }).then(res => {return this._checkResponse(res)})
  }
  createCard({name, link}) {
    return fetch(`${this.config.baseUrl}/cards`, {
    method: 'POST',
    headers: this.config.headers,
    body: JSON.stringify({
    name: name,
    link: link
  })
  }).then(res => {return this._checkResponse(res)})
  }
  //Постановка лайка
  setLike(cardId) {
    return fetch(`${this.config.baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: this.config.headers,
    body: JSON.stringify({
    name: this.profileName.textContent,
    about: this.profileSubname.textContent
  })
  }).then(res => {return this._checkResponse(res)})
  }
  unsetLike(cardId) {
    return fetch(`${this.config.baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this.config.headers
  }).then(res => {return this._checkResponse(res)})
  }
  deleteCard(cardId){
    return fetch(`${this.config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this.config.headers
    }
    ).then(res => {return this._checkResponse(res)})
  }
  changeAvatar(avatarUrl){
    return fetch(`${this.config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.config.headers,
    body: JSON.stringify({
    avatar: avatarUrl
  })
  }).then(res => {return this._checkResponse(res)})
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

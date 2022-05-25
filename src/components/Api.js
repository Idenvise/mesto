import {createNewCard} from '../pages/index.js'
export default class Api {
  constructor(profileName, profileSubname){
    this.profileName = profileName,
    this.profileSubname = profileSubname
  }
  //Начальные карточки
  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
    method: 'GET',
    headers: {
      authorization: '25506122-31ea-41ea-9643-f48e75424308'
    }
    }).then(res => {return res.json().then(arr => {return arr})})
    .catch(err => console.log(err));

  }
  //Получение данных профиля
  getProfileData() {
    return fetch('https://nomoreparties.co/v1/cohort-40/users/me',
    {method: 'GET',
      headers: {
      authorization: '25506122-31ea-41ea-9643-f48e75424308'
     }
    })
    .then(res => {if (res.ok){
      return res.json();
    } else {
      console.log('Всё идет не по плану(Профиль)')
    }}).then(res => {this.profileName.textContent = res.name;
                     this.profileSubname.textContent = res.about});
  }
  //Изменение данных профиля
  changeProfileData(name, subname, userInfo) {
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
    }).then(res => {if (res.ok) {
      return res.json()
    } else
      {
        return Promise.reject(res.status);
    }
    })
    .then(res => {
      userInfo.setUserInfo(res);})
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
  }).then(res => res.json()).then(obj => createNewCard(obj))
  .catch(err => console.log(err))
    }
  //Постановка лайка
  setLike(cardId, counter) {
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
  }).then(res => {if (res.ok) {
    return res.json();
  }}
  ).then(res => {
    counter.textContent = res.likes.length;
  })
  .catch(err => console.log(err))
  }
  unsetLike(cardId, counter) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
    'Content-Type': 'application/json'
    }
  }).then(res => {if (res.ok) {
    return res.json()
  }}).then(res => counter.textContent = res.likes.length)
    .catch(err => console.log(err))
  }
  deleteCard(cardId, card){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308',
    'Content-Type': 'application/json'
      }
    }
    ).then(res => {if (res.ok) {
      card.remove()
    }}).catch(err => console.log(err))
  }
}

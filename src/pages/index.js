import '../images/header__logo.svg'
import '../images/Avatar.jpg'
import '../pages/index.css';
import { popupProfile, profileOpenButton, popupAdd, addButton, profileName, profileSubname, popupZoom,
  template, sectionElements, formValidators, data,formsArr, inputName, inputSubname } from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


//Начальные карточки
let initialCards = await fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
  method: 'GET',
  headers: {
    authorization: '25506122-31ea-41ea-9643-f48e75424308'
  }
}).then(res => res.json())
.catch(err => console.log(err))

//Получение данных профиля
fetch('https://nomoreparties.co/v1/cohort-40/users/me',
{method: 'GET',
  headers: {
  authorization: '25506122-31ea-41ea-9643-f48e75424308'
 }
})
.then(res => {if (res.ok){
  return res.json();
} else {
  console.log('Всё идет не по плану(Профиль)')
}}).then(res => {profileName.textContent = res.name;
                 profileSubname.textContent = res.about});

//Изменение данных профиля
function profileEditRequest(name, subname) {
fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
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
//Создание карточки
function createNewCardRequest({name, link}) {
  fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
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
function openProfileEditor() {
  profileOpenButton.addEventListener('click', function () {
  const user = userInfo.getUserInfo();
  inputName.value = user.name;
  inputSubname.value = user.subname;
  profile.open();
  });
}

function openCardAdder() {
  addButton.addEventListener('click', function () {
    popupAddCard.open();
  });
}

function editProfile({name, subname}) {
  profileEditRequest(name, subname);
}

function createCard(item) {
  const newCard = new Card(item, template, handleCardClick)
  const generatedCard = newCard.generateCard();
  return generatedCard;
}

function addSubmitHandler( item ) {
  createNewCardRequest(item);
}

function createNewCard(item) {
  cardList.addItem(createCard(item));
  popupAddCard.resetForm();
  formValidators['popup_add'].resetValidation();
}

const userInfo = new UserInfo({ name: profileName, subname: profileSubname });

const profile = new PopupWithForm(popupProfile, editProfile);
profile.setEventListeners();
const popupAddCard = new PopupWithForm(popupAdd, addSubmitHandler);
popupAddCard.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
  cardList.addItem(createCard(item));
  }}, sectionElements);
cardList.renderItems();

const popupWithImage = new PopupWithImage(popupZoom);
popupWithImage.setEventListeners();

const enableValidation = (data) => {
  formsArr.forEach(form => {
    const validator = new FormValidation(data, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

enableValidation(data);
openProfileEditor();
openCardAdder();


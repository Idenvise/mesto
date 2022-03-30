const popupProfile = document.querySelector('.popup-profile');
const popups = document.querySelectorAll('.popup');
const profileOpenButton = document.querySelector('.profile__button');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const form = document.querySelector('.popup__form')
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
const popupInputName = document.querySelector('.popup__input_content_name');
const popupInputSubname = document.querySelector('.popup__input_content_subname');
const formAdd = document.querySelector('.popup-add .popup__form')
export const popupZoom = document.querySelector('.popup-zoom');
const popupList = Array.from(popups);
const template = document.querySelector('#template__element').content;
const sectionElements = document.querySelector('.elements');
const data = {
  popupInputSelector: '.popup__input',
  submitSelector: '.popup__save',
  showErrorClass: 'show-error',
  invalidInputClass: 'popup__input_invalid'
}
const formsArr = Array.from(document.forms);
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

//Закрытие попапов кликом на оверлей
function closeByClick() {
  popupList.forEach(popup => {
    popup.addEventListener('mousedown', function(evt) {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    })
  })
}

//Закрытие попапов нажатием на escape
function closeByEsc(evt) {
      if (evt.key == 'Escape') {
       closePopup(document.querySelector('.popup_visible'));
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEsc);
}
function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEsc);
}

function openProfileEditor() {
  profileOpenButton.addEventListener('click', function () {
    openPopup(popupProfile);
  });
}

function openCardAdder() {
  addButton.addEventListener('click', function () {
    openPopup(popupAdd);
  });
}

function addPopupCLoseListener() {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close'))  {
          closePopup(popup);
      }
    })
  });
}

function editProfile() {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileSubname.textContent = popupInputSubname.value;
    closePopup(popupProfile);
  });
}

import {Card} from './Card.js'
import {FormValidation} from './FormValidation.js'

initialCards.forEach(obj => {
  const card = new Card(obj, template);
  sectionElements.prepend(card._generateCard());
})

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const popupInputPlace = document.querySelector('.popup__input_content_place').value;
  const popupInputLink = document.querySelector('.popup__input_content_link').value;
  const popupAddObj = {
    name: popupInputPlace,
    link: popupInputLink
  }
  const userCard = new Card(popupAddObj, template);
  sectionElements.prepend(userCard._generateCard());
  popupAdd.classList.remove('popup_visible');
  formAdd.reset();
})

formsArr.forEach(form => {
  const start = new FormValidation(data, form);
  start.enableValidation();
})

addPopupCLoseListener();
openProfileEditor();
openCardAdder();
editProfile();
closeByClick();

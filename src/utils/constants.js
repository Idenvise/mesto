const popupProfile = document.querySelector('.popup-profile');
const profileOpenButton = document.querySelector('.profile__button');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomPlace = document.querySelector('.popup__zoom-place');
const popupZoomImg = document.querySelector('.popup__zoom-img');
const template = document.querySelector('#template__element').content;
const sectionElements = document.querySelector('.elements');
const inputName = document.querySelector('.popup__input_content_name');
const inputSubname = document.querySelector('.popup__input_content_subname');
const formValidators = {}
const data = {
  popupInputSelector: '.popup__input',
  submitSelector: '.popup__save',
  showErrorClass: 'show-error',
  invalidInputClass: 'popup__input_invalid',

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

export {popupProfile, profileOpenButton, popupAdd, addButton, profileName, profileSubname, popupZoom, popupZoomPlace,
  popupZoomImg, template, sectionElements, formValidators, data,formsArr, initialCards, inputSubname, inputName}


const popupZoomImg = document.querySelector('.popup__zoom-img');
const popupZoomPlace = document.querySelector('.popup__zoom-place');
const popupZoom = document.querySelector('.popup-zoom');
const elements = document.querySelector('.elements');
const popupProfile = document.querySelector('.popup-profile');
const popups = document.querySelectorAll('.popup');
const popupList = Array.from(popups);
const submitAdd = document.forms.popup_add.querySelector('.popup__save');
const profileOpenButton = document.querySelector('.profile__button');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const form = document.querySelector('.popup__form')
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
const popupInputName = document.querySelector('.popup__input_content_name');
const popupInputSubname = document.querySelector('.popup__input_content_subname');
const popupInputPlace = popupAdd.querySelector('.popup__input_content_place');
const popupInputLink = popupAdd.querySelector('.popup__input_content_link');
const formAdd = popupAdd.querySelector('.popup__form')

import {Card} from './Card.js'



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
       const openedPopup = document.querySelector('.popup_visible');
       closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEsc);
}
function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEsc);
}

function createCard(card) {
  const templateElement = templateElementContent.cloneNode(true);
  const elementImg = templateElement.querySelector('.element__img');
  elementImg.src = card.link;
  elementImg.alt = `На картинке ${card.alt}`;
  templateElement.querySelector('.element__title').textContent = card.name;
  // Лайк
  templateElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active')
  })
  // Удаление
  templateElement.querySelector('.element__trash').addEventListener('click', function(evt){
    evt.target.closest('.element').remove();
  })
  // Открытие
  elementImg.addEventListener('click', function(evt){
    popupZoomImg.src = evt.target.src;
    popupZoomImg.alt = `На картинке ${card.name}`
    popupZoomPlace.textContent = card.name;
    openPopup(popupZoom);
  })
  return templateElement;
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


function spawnCards() {
  initialCards.forEach(function (card){
    createCard(card);
    elements.prepend(createCard(card));
  });
}
function addCard() {
  formAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const card = {
      name: popupInputPlace.value,
      link: popupInputLink.value,
      alt: `На картинке ${popupInputPlace.value}`
    }
    formAdd.reset();
    elements.prepend(createCard(card));
    closePopup(popupAdd);
    submitAdd.setAttribute('disabled', 'disabled');
  });
}

addPopupCLoseListener();
openProfileEditor();
openCardAdder();
editProfile();
spawnCards();
addCard();
closeByClick();

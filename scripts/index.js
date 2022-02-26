const templateElementContent = document.querySelector('#template__element').content;
const popupZoomImg = document.querySelector('.popup__zoom-img');
const popupZoomPlace = document.querySelector('.popup__zoom-place');
const popupZoom = document.querySelector('.popup-zoom');
const elements = document.querySelector('.elements');
const popupProfile = document.querySelector('.popup-profile');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];

function openPopup(popup) {
  popup.classList.add('popup_visible');
}
function closePopup(popup) {
  popup.classList.remove('popup_visible');
}

function createCard(card) {
  const templateElement = templateElementContent.cloneNode(true);
  const elementImg = templateElement.querySelector('.element__img');
  elementImg.src = card.link;
  elementImg.alt = `На картинке ${card.alt}`;
  templateElement.querySelector('.element__title').textContent = card.name;
  // Лайк
  templateElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like')
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
  const profileOpenButton = document.querySelector('.profile__button');
  profileOpenButton.addEventListener('click', function () {
    openPopup(popupProfile);
  });
}
const popupAdd = document.querySelector('.popup-add')
function openCardAdder() {
  const addButton = document.querySelector('.profile__add-button');
  addButton.addEventListener('click', function () {
    openPopup(popupAdd);
  });
}

function addPopupCLoseListener() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close'))  {
          closePopup(popup);
      }
    })
  });
}


function editProfile() {
  const form = document.querySelector('.popup__form')
  const profileName = document.querySelector('.profile__name');
  const profileSubname = document.querySelector('.profile__subname');
  const popupInputName = document.querySelector('.popup__input_content_name');
  const popupInputSubname = document.querySelector('.popup__input_content_subname');
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
  const popupInputPlace = popupAdd.querySelector('.popup__input_content_place');
  const popupInputLink = popupAdd.querySelector('.popup__input_content_link');
  const form = popupAdd.querySelector('.popup__form')
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const card = {
      name: popupInputPlace.value,
      link: popupInputLink.value,
      alt: `На картинке ${popupInputPlace.value}`
    }
    popupInputPlace.value = '';
    popupInputLink.value = '';
    elements.prepend(createCard(card));
    closePopup(popupAdd);
  });
}

addPopupCLoseListener();
openProfileEditor();
openCardAdder();
editProfile();
spawnCards();
addCard();











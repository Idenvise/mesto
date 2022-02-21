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

const sectionElements = document.querySelector('.elements'); //Карточки из коробки, лайк, удаление
const templateElementContent = document.querySelector('#template__element').content;
const templateElements = templateElementContent.querySelector('.element').cloneNode(true);
let popupZoomImage = document.querySelector('.popup-zoom__img');
let popupZoomPlace = document.querySelector('.popup-zoom__place')
let popupZoom = document.querySelector('.popup-zoom')
function popupZoomVisible(){
  popupZoom.classList.add('popup_visible')
}
function popupZoomInvisible(){
  popupZoom.classList.remove('popup_visible')
}

initialCards.forEach(function (i){
  const templateElements = templateElementContent.querySelector('.element').cloneNode(true);
  templateElements.querySelector('.element__img').src = i.link;
  templateElements.querySelector('.element__img').alt = i.alt;
  templateElements.querySelector('.element__title').textContent = i.name;
  templateElements.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like')
    evt.target.classList.toggle('element__like_active')
  })
  templateElements.querySelector('.element__trash').addEventListener('click', function(){
    templateElements.querySelector('.element__trash').closest('.element').remove();
  })
  templateElements.querySelector('.element__img').addEventListener('click', function(evt){
    popupZoomImage.src = evt.target.src;
    popupZoomVisible();
  })
  sectionElements.prepend(templateElements);
})
let profileButton = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupInputName = document.querySelector('.popup__input_content_name');
let popupInputSubname = document.querySelector('.popup__input_content_subname');
let form = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name');
let profileSubname = document.querySelector('.profile__subname');

function popupVisible () { //Видимость и невидимость попапа
  popup.classList.add('popup_visible');
  popupInputName.value = profileName.textContent;
  popupInputSubname.value = profileSubname.textContent;
}

profileButton.addEventListener('click', popupVisible);

function popupInvisible () {
  popup.classList.remove('popup_visible');
}

popupClose.addEventListener('click', popupInvisible);

function formSubmitHandler (evt) {//Обработка изменений в профиле
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubname.textContent = popupInputSubname.value;
  popupInvisible();
};

form.addEventListener('submit', formSubmitHandler);

let popupAdd = document.querySelector('.popup_add');
let popupAddClose = popupAdd.querySelector('.popup__close')
let popupInputPlace = popupAdd.querySelector('.popup__input_content_place');
let popupInputLink = popupAdd.querySelector('.popup__input_content_link');
let profileAdd = document.querySelector('.profile__add-button');
let formAdd = popupAdd.querySelector('.popup__form')

function popupAddVisible () {//Видимиость и невидимость попапа добавления картинок
  popupAdd.classList.add('popup_visible');
}
profileAdd.addEventListener('click', popupAddVisible);

function popupAddInvisible () {
  popupAdd.classList.remove('popup_visible');
}
popupAddClose.addEventListener('click', popupAddInvisible);

function popupAddSubmitHandler(evt) {//Добавление и удаление карточек
  evt.preventDefault();
  const templateElements= templateElementContent.querySelector('.element').cloneNode(true);
  templateElements.querySelector('.element__img').src = popupInputLink.value;
  templateElements.querySelector('.element__title').textContent = popupInputPlace.value;
  templateElements.querySelector('.element__title').alt = popupInputPlace.value
  templateElements.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like')
    evt.target.classList.toggle('element__like_active')
  })
  templateElements.querySelector('.element__trash').addEventListener('click', function(){
    templateElements.querySelector('.element__trash').closest('.element').remove();
  })
  sectionElements.prepend(templateElements);
  popupAddInvisible();
}
formAdd.addEventListener('submit', popupAddSubmitHandler);







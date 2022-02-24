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
const popupZoomImage = document.querySelector('.popup__zoom__img');
const popupZoomPlace = document.querySelector('.popup__zoom__place');
const popupZoom = document.querySelector('.popup__zoom');
const popupZoomClose = document.querySelector('.popup__zoom__close');
//Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_visible');
}
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
      }
  })
})
//Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_visible');
}
const imgs = document.querySelectorAll('.element')
imgs.forEach((img) => {
  img.addEventListener('click', function(evt){
      if (evt.target.classList.contains('element__img')){
        popupZoomImage.src = ;
      }})})


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
    popupZoomPlace.textContent = i.name;
    //popupZoomVisible();
  })

  sectionElements.prepend(templateElements);
})
const profileButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupInputName = document.querySelector('.popup__input_content_name');
const popupInputSubname = document.querySelector('.popup__input_content_subname');
const form = document.querySelector('.popup__form')
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');

/*function popupVisible () { //Видимость и невидимость попапа
  popup.classList.add('popup_visible');
  popupInputName.value = profileName.textContent;
  popupInputSubname.value = profileSubname.textContent;
}*/

//profileButton.addEventListener('click', popupVisible);

function formSubmitHandler (evt) {//Обработка изменений в профиле
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubname.textContent = popupInputSubname.value;
  //popupInvisible();
};

form.addEventListener('submit', formSubmitHandler);

const popupAdd = document.querySelector('.popup__add');
const popupAddClose = popupAdd.querySelector('.popup__close')
const popupInputPlace = popupAdd.querySelector('.popup__input_content_place');
const popupInputLink = popupAdd.querySelector('.popup__input_content_link');
const profileAdd = document.querySelector('.profile__add-button');

const formAdd = popupAdd.querySelector('.popup__form')
profileAdd.addEventListener('click', popupAddVisible);
function popupAddVisible () {//Видимиость и невидимость попапа добавления картинок
  popupAdd.classList.add('popup_visible');
}

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
  templateElements.querySelector('.element__img').addEventListener('click', function(evt){
    popupZoomImage.src = evt.target.src;
    popupZoomPlace.textContent = templateElements.querySelector('.element__title').textContent;
    popupZoomVisible();
  })
  sectionElements.prepend(templateElements);
  popupAddInvisible();
}
formAdd.addEventListener('submit', popupAddSubmitHandler);







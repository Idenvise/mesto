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
const templateImg = document.querySelector('#template__element').content.querySelector('.element__img');
const elementsSection = document.querySelector('.elements');
const popupZoomImg = document.querySelector('.popup__zoom-img');
const popupZoomPlace = document.querySelector('.popup__zoom-place');

export class Card {
  constructor(obj) {
    this.name = obj.name;
    this.link = obj.link;
    this.alt = obj.alt;
  }
  _getTemplate() {
    return document.querySelector('#template__element').content.cloneNode(true);
  }
  _generateCard() {
    this._template = this._getTemplate();
    console.log(this._template.querySelector('.element__trash'))
    this._setEventListeners();
    const thisTemplateImg = this._template.querySelector('.element__img');
    this._template.querySelector('.element__title').textContent = this.name;
    thisTemplateImg.src = this.link;
    thisTemplateImg.alt = `На картинке изображен ${this.alt}`;
    elementsSection.append(this._template);

  }
  _appendCard() {

  }

  _setEventListeners() {
    this._template.querySelector('.element__img').addEventListener('click', () => {
      this._handleOpenPopup();
    })
    this._template.querySelector('.element__trash').addEventListener('click', () => {
      this._handleRemoveCard();
    })
    this._template.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    })
  }
  _handleOpenPopup() {
    popupZoomImg.src = this.link;
    popupZoomPlace.textContent = this.name;
    document.querySelector('.popup-zoom').classList.add('popup_visible');
  }
  _handleRemoveCard() {
    const trash = this._template.querySelector('.element__trash');
    trash.addEventListener('click', () => {
      trash.closest('.element').remove();
    })
  }
  _handleLike() {
    const like = this._template.querySelector('.element__like');
    like.addEventListener('click', () => {
      like.classList.toggle('element__like_active');
    })
  }
}

initialCards.forEach(obj => {
  const card = new Card(obj);
  const generatedCard = card._generateCard();
})


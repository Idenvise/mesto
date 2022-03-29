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
    const thisTemplateImg = this._template.querySelector('.element__img');
    this._template.querySelector('.element__title').textContent = this.name;
    thisTemplateImg.src = this.link;
    thisTemplateImg.alt = `На картинке изображен ${this.alt}`;

    this._template._setEventListeners();
    elementsSection.append(this._template);
  }
  _appendCard() {

  }

  _setEventListeners() {
    //Слушатель клика по картинке

    this._template.querySelector('.element__img').addEventListener('click', () => {
      //this._handleOpenPopup();
    })
    this._template.querySelector('.element__trash').addEventListener('click', () => {
      //this._handleOpenPopup();
    })
    this._template.querySelector('.element__like').addEventListener('click', () => {
      //this._handleOpenPopup();
    })
  }
  _handleOpenPopup() {
    document.querySelector('.popup__zoom-img') = this.link;
    document.querySelector('.zoom__zoom-place') = this.name;
    document.querySelector('.popup-zoom').classList.add('popup_visible');
  }
}

initialCards.forEach(obj => {
  const card = new Card(obj);
  const generatedCard = card._generateCard();
})


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
    this._template.querySelector('.element__title').textContent = this.name;
    this._template.querySelector('.element__img').src = this.link;
    this._template.querySelector('.element__img').alt = `На картинке изображен ${this.alt}`;
    return this._template;
  }
}

initialCards.forEach(obj => {
  const card = new Card(obj);
  const gen = card._generateCard();
  console.log(gen);
})


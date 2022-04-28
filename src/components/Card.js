export default class Card {
  constructor(obj, template, handleCardClick) {
    this.name = obj.name;
    this.link = obj.link;
    this._temp = template;
    this._handleCardClick = handleCardClick;
  }
  generateCard() {
    this._element = this._temp.querySelector('.element').cloneNode(true);
    this._elementImg = this._element.querySelector('.element__img');
    this._element.querySelector('.element__title').textContent = this.name;
    this._elementImg.src = this.link;
    this._elementImg.alt = `На картинке изображено место под названием ${this.name}`;
    this.setEventListeners();
    return this._element;
  }
  setEventListeners() {
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    })
    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._handleRemoveCard(evt);
    })
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLike(evt);
    })
  }
   _handleRemoveCard(evt) {
     this._element.remove();
   }
  _handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}

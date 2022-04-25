export default class Card {
  constructor(obj, template, handleCardClick) {
    this.name = obj.name;
    this.link = obj.link;
    this._temp = template;
    this._handleCardClick = handleCardClick;
  }
  generateCard() {
    this._template = this._temp.cloneNode(true);
    this._templateImg = this._template.querySelector('.element__img');
    this._template.querySelector('.element__title').textContent = this.name;
    this._templateImg.src = this.link;
    this._templateImg.alt = `На картинке изображено место под названием ${this.name}`;
    this._setEventListeners();
    return this._template;
  }
  _setEventListeners() {
    this._templateImg.addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    })
    this._template.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._handleRemoveCard(evt);
    })
    this._template.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLike(evt);
    })
  }
   _handleRemoveCard(evt) {
     evt.target.closest('.element').remove();
   }
  _handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}

export default class Card {
  constructor(obj, template, handleCardClick, handleLikeApi, counter) {
    this.name = obj.name;
    this.link = obj.link;
    this._temp = template;
    this._handleLikeApi = handleLikeApi;
    this._handleCardClick = handleCardClick;
    this._cardId= obj._id;
    this.counter = counter;
  }
  generateCard() {
    this._element = this._temp.querySelector('.element').cloneNode(true);
    this._elementImg = this._element.querySelector('.element__img');
    this._element.querySelector('.element__title').textContent = this.name;
    this._elementImg.src = this.link;
    this._elementImg.alt = `На картинке изображено место под названием ${this.name}`;
    console.log(this._element)
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
   _handleRemoveCard() {
     this._element.remove();
   }
  _handleLike(evt) {
    this._handleLikeApi(this._cardId, this.counter);
    evt.target.classList.toggle('element__like_active');
  }
}

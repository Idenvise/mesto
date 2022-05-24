export default class Card {
  constructor(obj, template, handleCardClick, handleSetLikeApi, handleUnsetLikeApi) {
    this.name = obj.name;
    this.link = obj.link;
    this.likes = obj.likes.length;
    this._temp = template;
    this._handleSetLikeApi = handleSetLikeApi;
    this._handleUnsetLikeApi = handleUnsetLikeApi;
    this._handleCardClick = handleCardClick;
    this._cardId= obj._id;
  }
  generateCard() {
    this._element = this._temp.querySelector('.element').cloneNode(true);
    this._elementImg = this._element.querySelector('.element__img');
    this.likeCounter =  this._element.querySelector('.element__like-counter')
    this._element.querySelector('.element__title').textContent = this.name;
    this.likeCounter.textContent = this.likes;
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
   _handleRemoveCard() {
     this._element.remove();
   }
  _handleLike(evt) {
    if (evt.target.classList.contains('element__like_active')) {
      this._handleUnsetLikeApi(this._cardId, this.likeCounter);
    } else {
      this._handleSetLikeApi(this._cardId, this.likeCounter);
    }
    evt.target.classList.toggle('element__like_active');
  }
}

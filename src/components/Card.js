export default class Card {
  constructor(obj, template, handleCardClick, handleSetLikeApi, handleUnsetLikeApi, openPopupDelete, initialInfo) {
    this.openPopupDelete = openPopupDelete;
    this.name = obj.name;
    this.link = obj.link;
    this._obj = obj;
    this.likes = obj.likes.length;
    this._temp = template;
    this._handleSetLikeApi = handleSetLikeApi;
    this._handleUnsetLikeApi = handleUnsetLikeApi;
    this._handleCardClick = handleCardClick;
    this._cardId= obj._id;
    this._initialInfo = initialInfo;
  }
  generateCard() {
    this._element = this._temp.querySelector('.element').cloneNode(true);
    this._elementImg = this._element.querySelector('.element__img');
    this._elementLike = this._element.querySelector('.element__like');
    this.likeCounter =  this._element.querySelector('.element__like-counter')
    this._element.querySelector('.element__title').textContent = this.name;
    this.likeCounter.textContent = this.likes;
    this._elementImg.src = this.link;
    if (this._obj.owner._id != this._initialInfo[1]._id) {
      this._element.querySelector('.element__trash').classList.add('element__trash_invisible')
    }
    this._elementImg.alt = `На картинке изображено место под названием ${this.name}`;
    this._obj.likes.forEach(el => {if (el._id == this._initialInfo[1]._id) {
      this._elementLike.classList.add('element__like_active')
    }})
    this.setEventListeners();
    return this._element;
  }
  setEventListeners() {
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this.name, this.link);
    })
    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      this.openPopupDelete(this._cardId, this._element);
    })
    this._elementLike.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like_active')) {
        this._handleUnsetLikeApi(this._cardId, this.likeCounter, this._handleLike, evt);
      } else {
        this._handleSetLikeApi(this._cardId, this.likeCounter, this._handleLike, evt);
      }
    })
  }
   _handleRemoveCard() {
     this._element.remove();
   }
  _handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}

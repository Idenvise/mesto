import { openPopup, popupZoom } from "./index.js";

export class Card {
  constructor(obj, template) {
    this.name = obj.name;
    this.link = obj.link;
    this._temp = template;
  }
  _getTemplate() {
    return document.querySelector('#template__element').content.cloneNode(true);
  }
  _generateCard() {
    this._template = this._temp.cloneNode(true);
    const thisTemplateImg = this._template.querySelector('.element__img');
    this._template.querySelector('.element__title').textContent = this.name;
    thisTemplateImg.src = this.link;
    thisTemplateImg.alt = `На картинке изображен ${this.name}`;
    this._setEventListeners(thisTemplateImg);
    return this._template;
  }
  _setEventListeners(thisTemplateImg) {
    thisTemplateImg.addEventListener('click', () => {
      this._handleOpenPopup();
    })
    this._template.querySelector('.element__trash').addEventListener('click', (evt) => {
      this._handleRemoveCard(evt);
    })
    this._template.querySelector('.element__like').addEventListener('click', (evt) => {
      this._handleLike(evt);
    })
  }
  _handleOpenPopup() {
    document.querySelector('.popup__zoom-img').src = this.link;
    document.querySelector('.popup__zoom-place').textContent = this.name;
    popupZoom.classList.add('popup_visible');
    openPopup(popupZoom);
  }
  _handleRemoveCard(evt) {
    evt.target.closest('.element').remove();
  }
  _handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}

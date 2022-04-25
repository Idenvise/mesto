export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }
  open() {
    this._handleEscClose();
    this._popup.classList.add('popup_visible');
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._closeByEsc);
  }
  _closeByEsc(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  }
  _handleEscClose() {
    document.addEventListener('keydown', this._closeByEsc.bind(this));
  }

  _setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close'))  {
        this.close();
      }
    })
  }
}

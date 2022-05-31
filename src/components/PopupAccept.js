import Popup from './Popup.js'
export default class PopupAccept extends Popup {
  constructor(popup, openPopupDelete) {
    super(popup)
    this._openPopupDelete = openPopupDelete;
    this._popupDelete = this._popup.querySelector('.popup__delete');
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupDelete.addEventListener('click', () => {
      this._openPopupDelete(this.cardId, this.card)
    } )
  }
  open(cardId, card) {
    super.open();
    this.cardId = cardId;
    this.card = card;
  }
}

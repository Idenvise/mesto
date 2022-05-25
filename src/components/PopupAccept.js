import Popup from './Popup.js'
export default class PopupAccept extends Popup {
  constructor(popup, openPopupDelete) {
    super(popup)
    this._openPopupDelete = openPopupDelete;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__delete').addEventListener('click', () => {
      this._openPopupDelete(this.cardId, this.card)
      super.close();
    } )
  }
  open(cardId, card) {
    super.open();
    this.cardId = cardId;
    this.card = card;
  }
}

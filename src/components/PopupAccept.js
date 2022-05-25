import Popup from './Popup.js'
export default class PopupAccept extends Popup {
  constructor(popup, submitHandler) {
    super(popup)
    this._submitHandler = submitHandler;
  }
  setEventListeners() {
    this._popup.querySelector('.popup__delete').setEventListeners('submit', evt => {
      evt.preventDefault();
      this._submitHandler();
    } )
  }
}

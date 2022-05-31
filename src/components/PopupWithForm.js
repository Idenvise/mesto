import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popup, submitHandler) {
    super(popup);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
    })
  }
  resetForm() {
    this._popupForm.reset();
  }
  close() {
    super.close();
    this.resetForm();
  }
}

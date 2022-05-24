import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popup, submitHandler) {
    super(popup);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector('.popup__form');
  }
  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
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
      super.close();
    })
  }
  resetForm() {
    this._popupForm.reset();
  }
}

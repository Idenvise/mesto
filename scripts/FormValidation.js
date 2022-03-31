export class FormValidation {
  constructor(data, form) {
    this._popupInputSelector = data.popupInputSelector;
    this._submitSelector = data.submitSelector;
    this._showErrorClass = data.showErrorClass;
    this._invalidInputClass = data.invalidInputClass;
    this._form = form;
  }
  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(`${this._popupInputSelector}`));
    this._button = this._form.querySelector(`${this._submitSelector}`);
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      this._toggleButtonState();
      this._checkInputValidity(inputElement);
    })
  })
  }
    _toggleButtonState() {
    if (this._invalidInputCheck()) {
      this._button.setAttribute('disabled', 'disabled');
    } else {
      this._button.removeAttribute('disabled');
    }
  }
  _invalidInputCheck() {
      return this._inputList.some(element => {
      return !element.validity.valid;
    })}
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
      inputElement.classList.add(`${this._invalidInputClass}`);
    } else {
      this._hideError(inputElement);
      inputElement.classList.remove(`${this._invalidInputClass}`);
    }
  }
  _showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._showErrorClass}`);
  }
  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(`.${this._showErrorClass}`);
    errorElement.textContent = '';
  }
  _resetValidation() {
    this._toggleButtonState();
    console.log(this._button)
  }
}

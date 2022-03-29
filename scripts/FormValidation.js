const data = {
  popupInputSelector: '.popup__input',
  submitSelector: '.popup__save',
  showErrorClass: 'show-error',
  invalidInputClass: 'popup__input_invalid'
}
const formsArr = Array.from(document.forms);

export class FormValidation {
  constructor(data, form) {
    this._popupInputSelector = data.popupInputSelector;
    this._submitSelector = data.submitSelector;
    this._showErrorClass = data.showErrorClass;
    this._invalidInputClass = data.invalidInputClass;
    this._form = form;
  }
  enableValidation() {
    this._setEventListener();
  }
  _setEventListener() {
    const inputList = Array.from(this._form.querySelectorAll(`${this._popupInputSelector}`));
    const button = this._form.querySelector(`${this._submitSelector}`);
    this._toggleButtonState(inputList, button);
    inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      this._toggleButtonState(inputList, button);
      this._checkInputValidity(inputElement);
    })
  })
  }
  _toggleButtonState(inputList, button) {
    if (this._invalidInputCheck(inputList, button)) {
      button.setAttribute('disabled', 'disabled');
    } else {
      button.removeAttribute('disabled');
    }
  }
  _invalidInputCheck(inputList) {
      return inputList.some(element => {
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
}

formsArr.forEach(form => {
  const start = new FormValidation(data, form);
  const enable = start.enableValidation();
})


/*
//Показать ошибку
const showError = (form, inputElement, errorMessage, classes) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${classes.showErrorClass}`);
}

//Скрыть ошибку
const hideError = (form, inputElement, classes) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(`.${classes.showErrorClass}`);
  errorElement.textContent = '';
}

//Проверка валидности инпутов
const checkInputValidity = (form, inputElement, classes) => {
  if (!inputElement.validity.valid) {
    showError(form, inputElement, inputElement.validationMessage, classes);
    inputElement.classList.add(`${classes.invalidInputClass}`);
  } else {
    hideError(form, inputElement, classes);
    inputElement.classList.remove(`${classes.invalidInputClass}`);
  }
}

//Добавление слушателей input в формы
function setEventListener(form, classes) {
  const inputList = Array.from(form.querySelectorAll(`${classes.popupInputSelector}`));
  const button = form.querySelector(`${classes.submitSelector}`);
  toggleButtonState(inputList, button);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      toggleButtonState(inputList, button);
      checkInputValidity(form, inputElement, classes);
    })
  })
}

//Включение валидации форм
const enableValidation = (classes) => {
  const forms = Array.from(document.forms);
  forms.forEach(form => {
    setEventListener(form, classes);
  })
}

//Состояние кнопки
const toggleButtonState = (inputList, button) => {
  if (invalidInputCheck(inputList, button)) {
    button.setAttribute('disabled', 'disabled');
  } else {
    button.removeAttribute('disabled');
  }
}

//Проверка кнопок
const invalidInputCheck = (inputList) => {
  return inputList.some(element => {
    return !element.validity.valid
  })
}

enableValidation({
  popupInputSelector: '.popup__input',
  submitSelector: '.popup__save',
  showErrorClass: 'show-error',
  invalidInputClass: 'popup__input_invalid'
});*/

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
});

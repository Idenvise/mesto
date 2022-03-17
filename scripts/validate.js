//Показать ошибку
const showError = (form, inputElement, errorMessage) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('show-error');
}

//Скрыть ошибку
const hideError = (form, inputElement) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('show-error');
  errorElement.textContent = '';
}

//Проверка валидности инпутов
const checkInputValidity = (form, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(form, inputElement, inputElement.validationMessage);
    inputElement.classList.add('popup__input_invalid')
  } else {
    hideError(form, inputElement);
    inputElement.classList.remove('popup__input_invalid')
  }
}

//Добавление слушателей input в формы
function setEventListener(form, rest) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__save');
  toggleButtonState(inputList, button);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      toggleButtonState(inputList, button);
      checkInputValidity(form, inputElement);
    })
  })
}

//Включение валидации форм
const enableValidation = (...rest) => {
  const forms = Array.from(document.forms);
  forms.forEach(form => {
    setEventListener(form, rest);
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

//Проверка полей профиля
const invalidInputCheck = (inputList) => {
  return inputList.some(element => {
    return !element.validity.valid
  })
}

enableValidation({
  popupInput: '.popup__input'
});

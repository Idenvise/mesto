const formProfile = document.forms.popup;
const inputName = document.querySelector('.popup__input_content_name');
const submitProfile = formProfile.querySelector('.popup__save')
//Показать ошибку
const showError = (formProfile, inputElement, errorMessage) => {
  const errorElement = formProfile.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('show-error');
}

//Скрыть ошибку
const hideError = (formProfile, inputElement) => {
  const errorElement = formProfile.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('show-error');
  errorElement.textContent = '';

}

//Проверка валидности инпутов
const checkInputValidity = (formProfile, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formProfile, inputElement, inputElement.validationMessage);
  } else {
    hideError(formProfile, inputElement);
  }
}

//Добавление слушателей input в форму профиля
function setEventListener(formProfile) {
  let inputList = Array.from(formProfile.querySelectorAll('.popup__input'));
  toggleButtonState(inputList);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formProfile, inputElement);
    })
  })
}

//Состояние кнопки
const toggleButtonState = (inputList) => {
  if (invalidInputCheck(inputList)) {
    submitProfile.setAttribute('disabled', 'disabled');
  } else {
    submitProfile.removeAttribute('disabled');
  }
}

//Проверка полей профиля
const invalidInputCheck = (inputList) => {
  return inputList.some(element => {
    return !element.validity.valid
  })
}

setEventListener(formProfile);

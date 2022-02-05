let profileButton = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupInputName = document.querySelector('.popup__input');
let popupInputSubname = document.querySelector('.popup__input:nth-of-type(2)');
let form = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name');
let profileSubname = document.querySelector('.profile__subname');
let popupSubmit = document.querySelector('.popup__save')

profileButton.addEventListener('click', function () {
  popup.classList.remove('popup_display_none');
});

popupClose.addEventListener('click', function () {
  popup.classList.add('popup_display_none');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubname.textContent = popupInputSubname.value;
  popupInputName.setAttribute('placeholder', profileName.textContent);
  popupInputSubname.setAttribute('placeholder', profileSubname.textContent);
  popupInputName.value = '';
  popupInputSubname.value = '';
  popup.classList.add('popup_display_none');
};
form.addEventListener('submit', formSubmitHandler);





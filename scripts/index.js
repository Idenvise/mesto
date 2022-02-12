let profileButton = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupInputName = document.querySelector('.popup__input_content_name');
let popupInputSubname = document.querySelector('.popup__input_content_subname');
let form = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name');
let profileSubname = document.querySelector('.profile__subname');

function popupVisible () {
  popup.classList.add('popup_visible');
  popupInputName.value = profileName.textContent;
  popupInputSubname.value = profileSubname.textContent;
}

profileButton.addEventListener('click', popupVisible);

function popupInvisible () {
  popup.classList.remove('popup_visible');
}

popupClose.addEventListener('click', popupInvisible);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileSubname.textContent = popupInputSubname.value;
  popupInvisible();
};

form.addEventListener('submit', formSubmitHandler);





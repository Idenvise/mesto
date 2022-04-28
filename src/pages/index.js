import '../images/header__logo.svg'
import '../images/Avatar.jpg'
import '../pages/index.css';
import { popupProfile, profileOpenButton, popupAdd, addButton, profileName, profileSubname, popupZoom,
  template, sectionElements, formValidators, data,formsArr, initialCards, inputName, inputSubname } from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

function openProfileEditor() {
  profileOpenButton.addEventListener('click', function () {
  const user = userInfo.getUserInfo();
  inputName.value = user.name;
  inputSubname.value = user.subname;
  profile.open();
  });
}

function openCardAdder() {
  addButton.addEventListener('click', function () {
    popupAddCard.open();
  });
}

function editProfile({name, subname}) {
  userInfo.setUserInfo({name, subname});
}

function createCard(item) {
  const newCard = new Card(item, template, handleCardClick)
  const generatedCard = newCard.generateCard();
  return generatedCard;
}

function addSubmitHandler( item ) {
  cardList.addItem(createCard(item));
  formValidators['popup_add'].resetValidation();
}

const userInfo = new UserInfo({ name: profileName, subname: profileSubname });

const profile = new PopupWithForm(popupProfile, editProfile);
profile.setEventListeners();
const popupAddCard = new PopupWithForm(popupAdd, addSubmitHandler);
popupAddCard.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
  cardList.addItem(createCard(item));
  }}, sectionElements);
cardList.renderItems();

const popupWithImage = new PopupWithImage(popupZoom);
popupWithImage.setEventListeners();

const enableValidation = (data) => {
  formsArr.forEach(form => {
    const validator = new FormValidation(data, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

enableValidation(data);
openProfileEditor();
openCardAdder();


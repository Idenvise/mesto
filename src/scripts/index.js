import {popupProfile, profileOpenButton, popupAdd, addButton, profileName, profileSubname,
  popupZoom,template, sectionElements, formValidators, data,formsArr,
  initialCards} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

function openProfileEditor() {
  profileOpenButton.addEventListener('click', function () {
  const user = userInfoClass.getUserInfo();
  profileName.value = user.name;
  profileSubname.value = user.subname;
  profileClass.open();
  });
}

function openCardAdder() {
  addButton.addEventListener('click', function () {
    addClass.open();
  });
}

function editProfile({name, subname}) {
  userInfoClass.setUserInfo({name, subname});
}
function addSubmitHandler( obj ) {
  const newCard = new Card(obj, template, handleCardClick)
  const generatedCard = newCard.generateCard();
  cardList.addItem(generatedCard);
  this._popupForm.reset();
  formValidators['popup_add']._resetValidation();
}

const userInfoClass = new UserInfo({ name: profileName, subname: profileSubname });

const profileClass = new PopupWithForm(popupProfile, editProfile);
profileClass._setEventListeners();
const addClass = new PopupWithForm(popupAdd, addSubmitHandler);
addClass._setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, template, handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }}, sectionElements);
cardList.renderItems();

const popupWithImage = new PopupWithImage(popupZoom);
popupWithImage._setEventListeners();

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
//addPopupCLoseListener();
openProfileEditor();
openCardAdder();
//editProfile();
//closeByClick();

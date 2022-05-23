import '../images/header__logo.svg'
import '../images/Avatar.jpg'
import '../pages/index.css';
import { popupProfile, profileOpenButton, popupAdd, addButton, profileName, profileSubname, popupZoom,
  template, sectionElements, formValidators, data,formsArr, inputName, inputSubname, counter } from '../utils/constants.js'
import '../components/Api.js'
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api(profileName, profileSubname);
const initialCards = await api.getInitialCards();
api.getProfileData();

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
  api.changeProfileData(name, subname, userInfo);
}

function createCard(item) {
  const newCard = new Card(item, template, handleCardClick, handleLikeApi, counter)
  const generatedCard = newCard.generateCard();
  return generatedCard;
}

function addSubmitHandler( item ) {
  api.createCard(item);
}

export function createNewCard(item) {
  cardList.addItem(createCard(item));
  popupAddCard.resetForm();
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
  counter.textContent = item.likes.length;
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

function handleLikeApi(cardId, counter) {
  console.log(counter)
  api.setLike(cardId, counter);
}

enableValidation(data);
openProfileEditor();
openCardAdder();


import '../images/header__logo.svg'
import '../images/Avatar.jpg'
import '../pages/index.css';
import { popupProfile, profileOpenButton, popupAdd, addButton, profileName, profileSubname, popupZoom,
  template, sectionElements, formValidators, data,formsArr, inputName, inputSubname, popupDelete, avatar, popupAvatar, avatarWrapper, popupAvatarButton, profileSave, popupAddSave} from '../utils/constants.js'
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo'
import PopupAccept from '../components/PopupAccept'

const api = new Api(profileName, profileSubname, avatar);
const initialCards = await api.getInitialCards();
api.getProfileData();

function openProfileEditor() {
  profileOpenButton.addEventListener('click', function() {
  const user = userInfo.getUserInfo();
  inputName.value = user.name;
  inputSubname.value = user.subname;
  profile.open();
  });
}

function openCardAdder() {
  addButton.addEventListener('click', function() {
    popupAddCard.open();
  });
}

function openAvatarChanger() {
  avatarWrapper.addEventListener('click', function() {
    newAvatar.open()
  })
}

function editProfile({name, subname}) {
  api.changeProfileData(name, subname, userInfo);
  profileSave.textContent = 'Сохранение...'
  setTimeout(closeProfileEditor, 1000)
}

function closeProfileEditor() {
  profile.close()
  profileSave.textContent = 'Сохранить'
}

function createCard(item) {
  const newCard = new Card(item, template, handleCardClick, handleSetLikeApi, handleUnsetLikeApi, openPopupDelete)
  const generatedCard = newCard.generateCard();
  return generatedCard;
}

function addSubmitHandler( item ) {
  popupAddSave.textContent = 'Сотворение...'
  api.createCard(item);

  setTimeout(closePopupAdd, 2000)
}

function closePopupAdd() {
  popupAddSave.textContent = 'Создать'
  popupAddCard.close()
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
const newAvatar = new PopupWithForm(popupAvatar, changeAvatar)
newAvatar.setEventListeners();

function changeAvatar({avatarUrl}) {
  api.changeAvatar(avatarUrl)
  popupAvatarButton.textContent = 'Сохранение...'
  avatar.onload = function(){
    newAvatar.close();
    popupAvatarButton.textContent = 'Сохранить'
  }
}
const popupAccept = new PopupAccept(popupDelete, deleteCard);
popupAccept.setEventListeners()

function openPopupDelete(cardId, card) {
  popupAccept.open(cardId, card)
}

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

function deleteCard(cardId, card) {
  api.deleteCard(cardId, card)
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleSetLikeApi(cardId, counter) {
  api.setLike(cardId, counter);
}

function handleUnsetLikeApi(cardId, counter) {
  api.unsetLike(cardId, counter);
}

enableValidation(data);
openProfileEditor();
openCardAdder();
openAvatarChanger();

import '../images/header__logo.svg'
import '../images/Avatar.jpg'
import '../pages/index.css';
import { popupProfile, profileOpenButton, popupAdd, addButton, profileName, profileSubname, popupZoom,
  template, sectionElements, formValidators, data, formsArr, inputName, inputSubname, popupDelete, avatar,
  popupAvatar, avatarWrapper, popupAvatarButton, profileSave, popupAddSave, popupDeleteButton,
  config,
  popupZoomPlace,
  popupZoomImg} from '../utils/constants.js'
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo'
import PopupAccept from '../components/PopupAccept'

const api = new Api(profileName, profileSubname, config);
const initialInfo = await Promise.all([api.getInitialCards(), api.getProfileInfo()]).catch(err => console.log(err))

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
  profileSave.textContent = 'Сохранение...'
  api.changeProfileData(name, subname)
  .then(res => {userInfo.setUserInfo(res)})
  .then(() => profile.close())
  .catch(err => console.log(err))
  .finally(() => profileSave.textContent = 'Сохранить')
}

function createCard(item) {
  const newCard = new Card(item, template, handleCardClick, handleSetLikeApi, handleUnsetLikeApi, openPopupDelete, initialInfo)
  const generatedCard = newCard.generateCard();
  return generatedCard;
}

function addSubmitHandler(item) {
  api.createCard(item)
  .then(obj => createNewCard(obj))
  .then(() => popupAddCard.close())
  .catch(err => console.log(err))
  .finally(() => popupAddSave.textContent = 'Создать')
  popupAddSave.textContent = 'Создание...'
}

function createNewCard(item) {
  cardList.addItem(createCard(item));
  popupAddCard.resetForm();
  formValidators['popup_add'].resetValidation();
}

const userInfo = new UserInfo({ name: profileName, subname: profileSubname, avatar, info:initialInfo });
userInfo.setUserInfo({name: initialInfo[1].name, about: initialInfo[1].about, avatar: initialInfo[1].avatar});
const profile = new PopupWithForm(popupProfile, editProfile);
profile.setEventListeners();
const popupAddCard = new PopupWithForm(popupAdd, addSubmitHandler);
popupAddCard.setEventListeners();
const newAvatar = new PopupWithForm(popupAvatar, changeAvatar)
newAvatar.setEventListeners();

function changeAvatar({avatarUrl}) {
  popupAvatarButton.textContent = 'Сохранение...'
  api.changeAvatar(avatarUrl)
  .then(res => avatar.src = res.avatar)
  .then(() => newAvatar.close())
  .catch(err => console.log(err))
  .finally(() => popupAvatarButton.textContent = 'Сохранить');
}

const popupAccept = new PopupAccept(popupDelete, deleteCard);
popupAccept.setEventListeners()

function openPopupDelete(cardId, card) {
  popupAccept.open(cardId, card)
}

const cardList = new Section({
  items: initialInfo[0],
  renderer: (item) => {
  cardList.addItem(createCard(item));
  }}, sectionElements);
cardList.renderItems();

const popupWithImage = new PopupWithImage(popupZoom, popupZoomPlace, popupZoomImg);
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
  api.deleteCard(cardId)
  .then(() => card.remove())
  .then(() => popupAccept.close())
  .catch(err => console.log(err))
  .finally(() => popupDeleteButton.textContent = 'Удалить')
  popupDeleteButton.textContent = 'Удаление...'
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleSetLikeApi(cardId, counter, handleLike, evt) {
  api.setLike(cardId, counter, handleLike, evt)
  .then((res) => counter.textContent = res.likes.length)
  .then(() => handleLike(evt))
  .catch(err => console.log(err))
}

function handleUnsetLikeApi(cardId, counter, handleLike, evt) {
  api.unsetLike(cardId)
  .then(res => counter.textContent = res.likes.length)
  .then(() => handleLike(evt))
  .catch(err => console.log(err))
}

enableValidation(data);
openProfileEditor();
openCardAdder();
openAvatarChanger();

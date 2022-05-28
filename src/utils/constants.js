const popupProfile = document.querySelector('.popup-profile');
const profileSave = popupProfile.querySelector('.popup__save');
const profileOpenButton = document.querySelector('.profile__button');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomPlace = document.querySelector('.popup__zoom-place');
const popupZoomImg = document.querySelector('.popup__zoom-img');
const template = document.querySelector('#template__element').content;
const sectionElements = document.querySelector('.elements');
const inputName = document.querySelector('.popup__input_content_name');
const inputSubname = document.querySelector('.popup__input_content_subname');
const popupDelete = document.querySelector('.popup-delete');
const avatar = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup-avatar');
const avatarWrapper = document.querySelector('.profile__avatar-wrapper');
const popupAvatarButton = popupAvatar.querySelector('.popup__save');
const popupAddSave = popupAdd.querySelector('.popup__save');
const formValidators = {}
const data = {
  popupInputSelector: '.popup__input',
  submitSelector: '.popup__save',
  showErrorClass: 'show-error',
  invalidInputClass: 'popup__input_invalid',

}
const formsArr = Array.from(document.forms);

export {popupProfile, profileOpenButton, popupAdd, addButton, profileName, profileSubname, popupZoom, popupZoomPlace,
  popupZoomImg, template, sectionElements, formValidators, data, formsArr, inputSubname, inputName, popupDelete, avatar, popupAvatar, avatarWrapper, popupAvatarButton, profileSave, popupAddSave}

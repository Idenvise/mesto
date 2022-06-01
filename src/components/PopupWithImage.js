import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popup, popupZoomPlace, popupZoomImg) {
    super(popup);
    this.popupZoomPlace = popupZoomPlace;
    this.popupZoomImg = popupZoomImg;
  }
  open(name, link) {
    this.popupZoomImg.src = link;
    this.popupZoomImg.alt = `На даннкой картинке изображено место под название ${name}`;
    this.popupZoomPlace.textContent = name;
    super.open();
  }
}

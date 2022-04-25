import Popup from '../../utils/constants.js'
import {popupZoomPlace, popupZoomImg} from '../../utils/constants.js'
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }
  open(name, link) {
    super._handleEscClose();
    popupZoomImg.src = link;
    popupZoomPlace.textContent = name;
    popupZoomPlace.alt = `На даннкой картинке изображено место под название ${name}`;
    this._popup.classList.add('popup_visible');
  }
}

import Popup from './Popup.js'
import {popupZoomPlace, popupZoomImg} from '../utils/constants.js'
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }
  open(name, link) {
    popupZoomImg.src = link;
    popupZoomImg.alt = `На даннкой картинке изображено место под название ${name}`;
    popupZoomPlace.textContent = name;
    super.open();
  }
}

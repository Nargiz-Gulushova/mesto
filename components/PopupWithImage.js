import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // для поиска данных картинки в попапе найдем конкретный попап
    this._popupImg = document.querySelector('.popup_img');
    this._popupCaption = this._popupImg.querySelector('.popup__caption');
    this._popupImage = this._popupImg.querySelector('.popup__image');
  }

  open(name, image) {
    this._popupCaption.textContent = name;
    this._popupImage.src = image;
    this._popupImage.alt = name;
    super.open();
  }
}



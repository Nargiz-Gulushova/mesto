import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupCaption = this._popup.querySelector(".popup__caption");
    this._popupImage = this._popup.querySelector(".popup__image");
  }

  open(name, image) {
    this._popupCaption.textContent = name;
    this._popupImage.src = image;
    this._popupImage.alt = name;
    super.open();
  }
}

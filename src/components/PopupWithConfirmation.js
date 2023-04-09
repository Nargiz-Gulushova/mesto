import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup);
    this._handleCardDelete = handleFormSubmit;
  }

  open(cardId, mestoElement) {
    this._cardId = cardId;
    this._mestoElement = mestoElement;
    super.open();
  };

  setEventListeners() {
    super.setEventListeners();
    this._sumbitButton.addEventListener('click', () => this._handleCardDelete(this._cardId, this._mestoElement));
  };
};

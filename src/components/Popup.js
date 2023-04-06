export default class Popup {

  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this._closeButton = this._popup.querySelector('.popup__close');
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  };

  open () {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose)

    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.target);
      }
    });
  };

  close () {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);

    this._popup.removeEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.target);
      };
    });

  }

  setEventListeners () {
    this._closeButton.addEventListener('click', () => {
      this.close()
    });
  }
}



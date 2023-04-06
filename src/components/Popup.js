export default class Popup {

  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
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
  };

  close () {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners () {
    this._closeButton.addEventListener('click', () => {
      this.close()
    });

    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.target);
      }
    });
  }
}



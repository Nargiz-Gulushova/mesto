import Popup  from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor (popup, {handleFormSubmit}) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from (this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues () {
    // создаем пустой объект значений инпутов и перебором всех инпутов вставляем
    // значения инпутов в значение свойства name объекта inputValues и возвращаем объект
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    // console.log(this._inputValues);
      return this._inputValues;

  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset()
  }
}

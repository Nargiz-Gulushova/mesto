export default class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(obj.submitButtonSelector);
    this._inputList = Array.from(
      formElement.querySelectorAll(obj.inputSelector)
    );
  }

  //_делаем спан видимым
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._obj.errorClass);
  }

  //_скрываем спан
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._obj.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._obj.errorClass);
  }

  //_проверяем валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //перебирает инпуты и если хоть один инпут невалидный, возвращает невалид
  _hasInvalidInput() {
    return this._inputList.some((item) => !item.validity.valid);
  }

  //методы деактивации и активации кнопки, отделены от метода переключения активности кнопки
  _inactivateButton() {
    this._buttonElement.classList.add(this._obj.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  _activateButton() {
    this._buttonElement.classList.remove(this._obj.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  //переключение активности кнопки при условии валидности/невалидности в любом поле формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._inactivateButton();
    } else {
      this._activateButton();
    }
  }

  // слушатели на инпуты, перебирающие все инпуты и переключающие состояние кнопки
  _setEventListeners() {
    //деактивируем кнопку при 1-ой загрузке сайта
    this._toggleButtonState();
    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _disableSubmit(evt) {
    evt.preventDefault();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", this._disableSubmit);
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }
}

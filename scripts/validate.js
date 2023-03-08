const formValidationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',//, вот здесь только красное нижнее подчеркивание в свойствах
  errorClass: 'popup__error_visible'  //а здесь стилизация видимости и текста ошибки
};

//функция которая показывает сообщение ошибки, делает видимым спан
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};
//скрывает сообщение ошибки
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

//проверяем валидность инпута и вызываем функции выше
const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
    };
}

//перебирает инпуты и если хоть один инпут невалидный, возвращает невалид
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функции деактивации и активации кнопки, отделены от функции переключения активности кнопки
function inactivateButton (buttonElement, obj) {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.disabled = true;
};
function activateButton (buttonElement, obj) {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  buttonElement.disabled = false;
};

//переключение активности кнопки при условии невалидности в любом поле формы
function toggleButtonState (inputList,buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
      inactivateButton (buttonElement, obj)
  } else {
    activateButton (buttonElement, obj)
    }
};



//вешаем слушатели на инпуты, перебирающие все инпуты (внутри вызываем функцию переключения состояния кнопки)
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, buttonElement, obj);
  formElement.addEventListener('reset', () => {
    //`setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стека) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
    toggleButtonState(inputList, buttonElement, obj)
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};



//вынесли отмену станд.отправки в отд.функцию
function disableSubmit (evt) {
  evt.preventDefault();
}

//универсальная функция валидации для всех полей форм
//(отменяем стандартную отправку формы и управляем состоянием кнопки сабмита)
function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', disableSubmit);
    setEventListeners(formElement, obj);
  });
};

//запускаем универсальную валидацию
enableValidation(formValidationObj);



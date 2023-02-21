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
////вешаем слушатели на инпуты, перебирающие все инпуты (проверяем валидность и переключаем состояние кнопки сабмита)
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
  });
});

};

//перебирает инпуты и если хоть один инпут невалидный, возвращает невалид
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//в зависимости от валидности поля функция переключает состояние кнопки
function toggleButtonState (inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    }
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




//ПО ТРЕНАЖЕРУ ЧЕРЕЗ ПАРАМЕТРЫ, НЕ ОБЪЕКТОМ (реализация с ОБЪЕКТом ниже, ничего не выходит - закоммитила)

//функция которая показывает сообщение ошибки, делает видимым спан
//const showInputError = (formElement, inputElement, errorMessage) => {
//  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//  inputElement.classList.add('popup__input_type_error');
//  errorElement.textContent = errorMessage;
//  errorElement.classList.add('popup__error_visible');
//};
////скрывает сообщение ошибки
//const hideInputError = (formElement, inputElement) => {
//  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//  inputElement.classList.remove('popup__input_type_error');
//  errorElement.classList.remove('popup__error_visible');
//  errorElement.textContent = '';
//};
//
////проверяем валидность инпута и вызываем функции выше
//const checkInputValidity = (formElement, inputElement) => {
//  if (!inputElement.validity.valid) {
//    showInputError(formElement, inputElement, inputElement.validationMessage);
//  } else {
//    hideInputError(formElement, inputElement);
//    };
//}
//////вешаем слушатели на инпуты, перебирающие все инпуты (проверяем валидность и переключаем состояние кнопки сабмита)
//const setEventListeners = (formElement) => {
//  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//  const buttonElement = formElement.querySelector('.popup__submit-button');
//  toggleButtonState(inputList, buttonElement);
//  inputList.forEach((inputElement) => {
//    inputElement.addEventListener('input', function () {
//      checkInputValidity(formElement, inputElement);
//      toggleButtonState(inputList, buttonElement);
//  });
//});
//
//};
//
////перебирает инпуты и если хоть один инпут невалидный, возвращает невалид
//function hasInvalidInput (inputList) {
//  return inputList.some((inputElement) => {
//    return !inputElement.validity.valid;
//  });
//};
//
////в зависимости от валидности поля функция переключает состояние кнопки
//function toggleButtonState (inputList, buttonElement) {
//  if (hasInvalidInput(inputList)) {
//    buttonElement.classList.add('popup__submit-button_disabled');
//  } else {
//    buttonElement.classList.remove('popup__submit-button_disabled');
//    }
//};
//
////вынесли отмену станд.отправки в отд.функцию
//function disableSubmit (evt) {
//  evt.preventDefault();
//}
//
////универсальная функция валидации для всех полей форм
////(отменяем стандартную отправку формы и управляем состоянием кнопки сабмита)
//function enableValidation() {
//  const formList = Array.from(document.querySelectorAll('.popup__form'));
//  formList.forEach((formElement) => {
//    formElement.addEventListener('submit', disableSubmit);
//    setEventListeners(formElement);
//  });
//};
//
////запускаем универсальную валидацию
//enableValidation();







//МЕНЯЕМ ПАРАМЕТРЫ НА ОБЪЕКТЫ
//функция которая показывает сообщение ошибки, делает видимым спан
//const showInputError = (formElement, inputElement, errorMessage, obj) => {
//  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//  inputElement.classList.add(obj.inputErrorClass);
//  errorElement.textContent = errorMessage;
//  errorElement.classList.add(obj.errorClass);
//};
//
////функция скрывающая сообщение ошибки, спан невидим
//const hideInputError = (formElement, inputElement, obj) => {
//  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//  inputElement.classList.remove(obj.inputErrorClass);
//  errorElement.classList.remove(obj.errorClass);
//  errorElement.textContent = '';
//};
//
////проверяем валидность инпута и вызываем функции выше
//const checkInputValidity = (formElement, inputElement) => {
//  if (!inputElement.validity.valid) {
//    showInputError(formElement, inputElement, inputElement.validationMessage);
//  } else {
//    hideInputError(formElement, inputElement);
//  }
//};
//
////вешаем слушатели на инпуты, перебирающие все инпуты (проверяем валидность и переключаем состояние кнопки сабмита)
//const setEventListeners = (formElement, obj) => {
//  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
//  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
//  toggleButtonState(inputList, buttonElement);
//  inputList.forEach((inputElement) => {
//    inputElement.addEventListener('input', function (evt) {
//      checkInputValidity(formElement, inputElement);
//      toggleButtonState(inputList, buttonElement);
//    });
//  });
//};
//
////перебирает инпуты и если хоть один инпут невалидный, возвращает true
//function hasInvalidInput (inputList) {
//  return inputList.some((inputElement) => {
//  return !inputElement.validity.valid;
//  });
//};
//
////в зависимости от валидности поля функция переключает состояние кнопки
//function toggleButtonState (inputList, buttonElement, obj) {
//  if (hasInvalidInput(inputList)) {
//  buttonElement.classList.add(obj.inactiveButtonClass);
//  } else {
//  buttonElement.classList.remove(obj.inactiveButtonClass);
//  }
//};
//
//function disableSubmit (evt) {
//  evt.preventDefault();
//}
//
////универсальная функция валидации для всех полей форм (отменяем стандартную отправку сабмита и управляем состоянием кнопки сабмита)
//function enableValidation(obj) {
//  const formList = Array.from(document.querySelectorAll(obj.formSelector));
//  formList.forEach((formElement) => {
//    formElement.addEventListener('submit', disableSubmit);
//    setEventListeners();
//  });
//};
//

//enableValidation(formValidationObj);










//ПО СКРИНКАСТУ

//enableValidation(obj);
//
//function enableValidation ({formSelector, inputSelector, submitButtonSelector, errorClass}) {
//  //запускаем процесс наложения валидации
//  const forms = Array.from(document.querySelectorAll(formSelector));
//  forms.forEach(form => {
//    //обработчик для каждой формы, чтобы она не сабмитилась
//    form.addEventListener('submit', evt => evt.preventDefault())
//    //обработчик инпута на каждое поле формы
//    const inputs = Array.from(form.querySelectorAll(inputSelector));
//    inputs.forEach(input => {
//      input.addEventListener('input', evt => {
//        //проверка валидности введенных данных в инпут
//        if(input.validity.valid) {
//          //скрыть ошибку
//        } else {
//          //показать ошибку
//        }
//      })
//    })
//  })
//}



//ПО ЛАЙВКОДИНГУ (93:53)
////объявляем функцию отмены стандартной отправки формы
//function disableSubmit(event) {
//  event.preventDefault();
//};
//
////универсальная валидация
//function enableValidation(obj) {
//  const form = document.querySelector(obj.formSelector);
//  form.addEventListener('submit', disableSubmit);
//  addInputListeners(form, obj);
//}
//
////добавляем класс на инвалидный инпут
//function handleFormInput(event, obj) {
//  const input = event.target;
//  const inputId = input.id;
//  const errorElement = document.querySelector(`#${inputId}-error`);
//  if (input.validity.valid) {
//    input.classList.remove(obj.inputErrorClass)
//  } else {
//    input.classList.add(obj.inputErrorClass);
//  }
//}
//
////вешаем слушатели
//function addInputListeners(form, obj) {
//  const inputList = Array.from(form.querySelectorAll(obj.inputSelector));
//  inputList.forEach(function (item) {
//    item.addEventListener('input', (event) => {
//      handleFormInput(event, obj)
//    });
//  });
//}
//
//
//
//enableValidation(formValidationObj);






//ПРИБЛИЗИТЕЛЬНЫЙ ПЛАН ДЕЙСТВИЙ
/////!!!!!!!Если сообщение об ошибке от трёх строк высотой, то размер модального окна увеличивается.
//1. данные любого поля ввода проверяются одной унифицированной функцией
/////для проверки данных в поле используются HTML5-атрибуты и JS-свойство ValidityState ;

//2. неактивный цвет сохранить и создать

//4. требования к коду:
/////- каждая функция выполняет одно действие, например возвращает разметку карточки
/////- функции, декларированные как function functionName() {} (function declaration),
///////должны быть вызваны после объявления.
/////- за состояние кнопки сабмита отвечает отдельная функция;
/////- код валидации разбит на функции
/////- функция enableValidation ответственна за включение валидации всех форм
///////(она принимает на вход объект параметров, а затем передаёт параметры вложенным функциям;)
///////(принимает как объект настроек все нужные функциям классы и селекторы элементов):
////////enableValidation({
////////  formSelector: '.popup__form', селектор формы
////////  inputSelector: '.popup__input',селектор инпутов внутри этой формы
////////  submitButtonSelector: '.popup__button', селектор кнопки сабмита этой формы
////////  inactiveButtonClass: 'popup__button_disabled', класс модификатор для дизэйбла кнопки
////////  inputErrorClass: 'popup__input_type_error', класс модификатор
// для инпутов при возникновении ошибки
////////  errorClass: 'popup__error_visible' селектор контейнеров для ошибок этой формы
////////});

//, , , ,  и

/////-код валидации в отдельном файле validate.js


//попытка сделать рефакторинг слушателя на лайке по тренажеру (не получилось)
//mestoList.addEventListener('click', function (evt) {
//  if (evt.target.classList.contains('.mesto__like-button')) {
//    evt.target.classList.toggle('mesto__like-button_active');
//  }
//
//});


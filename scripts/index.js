// Задаем константы и переменные для дом-элементов
const popupElement = document.querySelector('.popup');
const profileElement = document.querySelector('.profile');
const popupOpenElement = profileElement.querySelector('.profile__edit-button')
const popupCloseElement = popupElement.querySelector('.popup__close');
const formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = profileElement.querySelector('.profile__name');
let profileJob = profileElement.querySelector('.profile__job');

// Функции для добавления и удаления класса открытия попапа
const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

//Добавляем слушатели для кнопок редакта и крестика
popupOpenElement.addEventListener('click', openPopup);
popupCloseElement.addEventListener('click', closePopup);


// Функция для удаления класса открытия попапа для кнопки Сохранить

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

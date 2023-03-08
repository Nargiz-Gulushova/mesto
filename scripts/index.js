import {initialCards} from './cards.js';
import {
  popupEditProfile,
  buttenOpenPopupProfile,
  buttenClosePopupProfile,
  formProfile,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupAddMesto,
  popupOpenAddMesto,
  popupCloseAddMesto,
  titleInput,
  imageInput,
  formMesto,
  popupImg,
  popupCloseImg,
} from './constants.js';
import Mesto from './Mesto.js';
import FormValidator from './FormValidator.js';


//import Mesto from './Mesto';
//import initialCards from './cards';
//import {profileElement, popupEditProfile, buttenOpenPopupProfile, buttenClosePopupProfile, formProfile,
//  nameInput, jobInput, profileName, profileJob, popupAddMesto, popupOpenAddMesto, popupCloseAddMesto,
//  titleInput, imageInput, formMesto, popupImg, popupCloseImg, mestoList, popupCaption, popupImage
//  } from './constants';


//ФУНКЦИИ
// функции открытия и закрытия попапов

function closePopupByOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target === popupOpened) {
    closePopup(popupOpened);
  }
}

const closePopupByEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened')
	if( evt.key === 'Escape') {
		closePopup(popupOpened);
	}
}

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
}




//присвоим переменную функции открытия попапа редактирования профиля для улучшения читаемости слушателя
const openEditProfilePopup = () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};




//перебором массива создаем экземпляры мест и добавляем 6 КАРТОЧЕК в разметку
initialCards.forEach((item) => {
  const mesto = new Mesto(item, '#mesto-template');
  const mestoElement = mesto.generateMesto();

  document.querySelector('.mesto__list').append(mestoElement);
});

//обработчик добавления новой карточки

function addHandleFormSubmit (evt) {
  evt.preventDefault();
  const newMesto = new Mesto ({name: titleInput.value, link: imageInput.value}, '#mesto-template');
  const newMestoElement = newMesto.generateMesto();
  document.querySelector('.mesto__list').prepend(newMestoElement);
  closePopup(popupAddMesto);
  evt.target.reset();
}
//слушатель новой карточки на обработчик по сабмит

formMesto.addEventListener('submit', addHandleFormSubmit);

//CЛУШАТЕЛИ И ОБРАБОТЧИКИ


//слушатели на открытие и закрытие попапа редактирования профиля
buttenOpenPopupProfile.addEventListener('click', openEditProfilePopup);

buttenClosePopupProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

//обработчик события на закрытие попапа редакт.профиля
function editHandleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//слушатель на обработчик по сабмит
formProfile.addEventListener('submit', editHandleFormSubmit);

const openAddMestoPopup = () => {
  openPopup(popupAddMesto);
}

//слушатели на открытие/закрытие попапа новой карточки
popupOpenAddMesto.addEventListener('click', openAddMestoPopup);




popupCloseAddMesto.addEventListener('click', (popupElement) => {
  closePopup(popupAddMesto);
});






//слушатели на закрытие модального окна с картинкой
popupCloseImg.addEventListener('click', (popupElement) => {
  closePopup(popupImg);
  });


  //ВАЛИДАЦИЯ

//Объект селекторов и классов
const formValidationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',//, вот здесь только красное нижнее подчеркивание в свойствах
  errorClass: 'popup__error_visible'  //а здесь стилизация видимости и текста ошибки
};

//экземпляры класса FormValidator для каждой формы
const editProfileFormValidator = new FormValidator (formValidationObj, formProfile);
const addProfileFormValidator = new FormValidator(formValidationObj, formMesto);

//запускаем валидацию
editProfileFormValidator.enableValidation();

addProfileFormValidator.enableValidation();


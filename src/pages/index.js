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
  mestoList,
  popupImg,
  popupCloseImg,
  popupCaption,
  closeButtons,
  initialCards,
} from '../utils/constants';
import Mesto from '../components/Mesto';
import Section  from '../components/Section.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
// import UserInfo from '../components/UserInfo/js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';

// код по Mesto

// функция создания карточки через метод экземпляра класса Mesto
function createCard(item) {
  const mesto = new Mesto(item, '#mesto-template', handleImageClick);
  const mestoElement = mesto.generateMesto();
  return mestoElement
}

// код по Section

// объявление экземпляра класса Section с передачей в аргументы функции renderCard и темплейта
const section = new Section({
  renderer: (item) => {
    renderCard(item)
  }},
    '.mesto__list');

// добавляем изначальные карточки методом класса
section.renderItems(initialCards);


// описание функции renderCard для вставки новой карточки в разметку через метод класса Section
//
function renderCard (item) {
  // const cardElement = createCard(item);
  section.addItem(createCard(item))
}

// код по Popup

// код по PopupWithImage
// создаем экземпляр попапа изображения
const popupImage = new PopupWithImage (popupImg);
// вешаем слушатель на попап
popupImage.setEventListeners();

// функция, описывающая поведение при нажатии на карточку
export function handleImageClick(name, image) {
  popupImage.open(name, image);
}


// код по PopupWithForm для попапа добавления карточки

// экземпляр попапа добавления новой карточки
const addMestoPopup = new PopupWithForm (popupAddMesto, {
  handleFormSubmit: ({title, image}) => {
    renderCard ({
      name: title,
      link: image})
}})

  // вешаем слушатель на кнопку открытия попапа добавления новой карточки
  popupOpenAddMesto.addEventListener('click', () => {
    addMestoPopup.open()
  });

  // вызываем слушатели как метод класса
  addMestoPopup.setEventListeners();

// код по UserInfo для редактирования профиля

// экземпляр класса UserInfo
const userInfo = new UserInfo ({
  userName: '.profile__name',
  userJob: '.profile__job'
})

// экземпляр попапа редактирования профиля
const profileEditPopup = new PopupWithForm (popupEditProfile, {
  handleFormSubmit: (info) => {
    userInfo.setUserInfo(info)
  }
})

buttenOpenPopupProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileEditPopup.open();
})

profileEditPopup.setEventListeners();

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



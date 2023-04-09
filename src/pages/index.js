import {
  popupEditProfile,
  buttenOpenPopupProfile,
  formProfile,
  nameInput,
  jobInput,
  popupAddMesto,
  popupOpenAddMesto,
  formMesto,
  popupImg,
  formValidationObj
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

import Api  from '../components/Api.js';
import { apiSettings } from '../utils/apiConfig.js';

// Переменная для ID текущего пользователя
let currentUserId;

// Создаем экземпляр класса API
const api = new Api(apiSettings);

// код по Mesto

// функция создания карточки через метод экземпляра класса Mesto
function createCard(item) {
  const mesto = new Mesto(item, currentUserId, '#mesto-template', {
    handleImageClick: (name, link) => popupImage.open(name, link),
    handleCardDelete: () => {},
    handlePutLike: () => {},
    handleDeleteLike: () => {}
  });
  const mestoElement = mesto.generateMesto();
  return mestoElement;
}

// код по Section

// объявление экземпляра класса Section с передачей в аргументы функции renderCard и темплейта
const section = new Section({
  renderer: (item) => {
    section.addItem(createCard(item))
  }},
    '.mesto__list');

// код по UserInfo для редактирования профиля

// экземпляр класса UserInfo
const userInfo = new UserInfo ({
  userName: '.profile__name',
  userJob: '.profile__job'
})

// Прогружаем одновременно данные пользователя и карточки, чтобы ID пользователя не потерялся и все пришло ответом вместе
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userInfo._id; // записала текущий ID пользователя
    userInfo.setUserInfo({name: userData.name, job: userData.about}) // записала данные пользователя, которые пришли с сервера
    section.renderItems(cards) // рендер полученных с сервера карточек
  })
  .catch(err => console.log(err))

// код по Popup

// код по PopupWithImage
// создаем экземпляр попапа изображения
const popupImage = new PopupWithImage (popupImg);

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

// Слушатели
addMestoPopup.setEventListeners();
profileEditPopup.setEventListeners();
popupImage.setEventListeners();

  //ВАЛИДАЦИЯ
//экземпляры класса FormValidator для каждой формы
const editProfileFormValidator = new FormValidator (formValidationObj, formProfile);
const addProfileFormValidator = new FormValidator(formValidationObj, formMesto);

//запускаем валидацию
editProfileFormValidator.enableValidation();
addProfileFormValidator.enableValidation();



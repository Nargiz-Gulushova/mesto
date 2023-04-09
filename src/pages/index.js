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
  formValidationObj,
  buttonEditAvatar,
  popupEditAvatar,
  formAvatar,
  popupConfirm
} from '../utils/constants.js';
import Mesto from '../components/Mesto.js';
import Section  from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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
    handleCardDelete: (cardId, mestoElement) => popupWithConfirmation.open(cardId, mestoElement),
    handlePutLike: (cardId) => {
      api.likeCard(cardId)
        .then(res => mesto.renderLikes(res))
        .catch(err => console.log(`Ошибка постановки лайка ${err}`))
    },
    handleDeleteLike: (cardId) => {
      api.dislikeCard(cardId)
        .then(res => mesto.renderLikes(res))
        .catch(err => console.log(`Ошибка снятия лайка ${err}`))
    }
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
  userJob: '.profile__job',
  userAvatar: '.profile__avatar'
})

// Прогружаем одновременно данные пользователя и карточки, чтобы ID пользователя не потерялся и все пришло ответом вместе
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id; // записала текущий ID пользователя
    userInfo.setUserInfo({name: userData.name, job: userData.about}) // записала данные пользователя, которые пришли с сервера
    userInfo.setUserAvatar(userData.avatar);
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
    addMestoPopup.renderLoading('Создание...')
    api.addNewCard({name: title, link: image})
      .then(res => {
        section.addItem(createCard(res));
        addMestoPopup.close();
      })
      .catch(err => console.log(`Ошибка добавления карточки ${err}`))
      .finally(() => addMestoPopup.renderLoading('Создать'))
}})

// вешаем слушатель на кнопку открытия попапа добавления новой карточки
popupOpenAddMesto.addEventListener('click', () => {
  addProfileFormValidator.resetValidation();
  addMestoPopup.open()
});

// экземпляр попапа редактирования профиля
const profileEditPopup = new PopupWithForm (popupEditProfile, {
  handleFormSubmit: (info) => {
    profileEditPopup.renderLoading('Сохранение...')
    api.changeUserInfo({name: info.name, about: info.job})
      .then(res => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about
        });
        profileEditPopup.close();
      })
      .catch(err => console.log(`Ошибка редактирования данных ${err}`))
      .finally(() => profileEditPopup.renderLoading('Сохранить'))
  }
})

const avatarEditPopup = new PopupWithForm(popupEditAvatar, {
  handleFormSubmit: (link) => {
    avatarEditPopup.renderLoading('Сохранение...')
    api.changeAvatar({avatar: link['input-avatar-link']})
      .then(res => {
        userInfo.setUserAvatar(res.avatar);
        avatarEditPopup.close();
      })
      .catch(err => console.log(`Ошибка при обновлении аватара ${err}`))
      .finally(() => avatarEditPopup.renderLoading('Сохранить'))
  }
});

const popupWithConfirmation = new PopupWithConfirmation(popupConfirm, {
  handleFormSubmit: (cardId, mestoElement) => {
    popupWithConfirmation.renderLoading('Удаление...')
    api.deleteCard(cardId)
      .then(() => {
        mestoElement.deleteMesto();
        popupWithConfirmation.close();
      })
      .catch(err => console.log(`Ошибка при удалении ${err}`))
      .finally(() => popupWithConfirmation.renderLoading('Да'))
  }
});

buttenOpenPopupProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileEditPopup.open();
  editProfileFormValidator.resetValidation();
});

buttonEditAvatar.addEventListener('click', () => {
  editAvatarFormValidator.resetValidation();
  avatarEditPopup.open();
});

// Слушатели
addMestoPopup.setEventListeners();
profileEditPopup.setEventListeners();
popupImage.setEventListeners();
avatarEditPopup.setEventListeners();
popupWithConfirmation.setEventListeners();

  //ВАЛИДАЦИЯ
//экземпляры класса FormValidator для каждой формы
const editProfileFormValidator = new FormValidator (formValidationObj, formProfile);
const addProfileFormValidator = new FormValidator(formValidationObj, formMesto);
const editAvatarFormValidator = new FormValidator(formValidationObj, formAvatar);

//запускаем валидацию
editProfileFormValidator.enableValidation();
addProfileFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

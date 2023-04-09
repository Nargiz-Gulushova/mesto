

//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
export const profileElement = document.querySelector('.profile');
export const popupEditProfile = document.querySelector('.popup_edit-profile'); //попап редактирования профиля
export const buttenOpenPopupProfile = profileElement.querySelector('.profile__edit-button');
export const buttenClosePopupProfile = popupEditProfile.querySelector('.popup__close_edit-profile');
export const formProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');// то же самое
export const profileName = profileElement.querySelector('.profile__name');
export const profileJob = profileElement.querySelector('.profile__job');
export const popupAddMesto = document.querySelector('.popup_add-mesto');
export const popupOpenAddMesto = profileElement.querySelector('.profile__add-button');
export const popupCloseAddMesto = popupAddMesto.querySelector('.popup__close_add-mesto');
export const titleInput = document.querySelector('.popup__input_type_title');
export const imageInput = document.querySelector('.popup__input_type_image');
export const formMesto = document.querySelector('.popup__form_add-mesto');
export const popupImg = document.querySelector('.popup_img');
export const popupCloseImg = popupImg.querySelector('.popup__close_img');
export const mestoList = document.querySelector('.mesto__list'); //ul-container with cards in html
export const popupCaption = popupImg.querySelector('.popup__caption');
export const closeButtons = document.querySelectorAll('.popup__close');

//Объект селекторов и классов
export const formValidationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',//, вот здесь только красное нижнее подчеркивание в свойствах
  errorClass: 'popup__error_visible'  //а здесь стилизация видимости и текста ошибки
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



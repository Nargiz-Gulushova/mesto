// ПОПАПЫ ОТКРЫТИЯ И ЗАКРЫТИЯ

//переменные
const profileElement = document.querySelector('.profile');
const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__form');

// функции открытия и закрытия попапов
const openPopup = function(popupElement) {
  popupElement.classList.add('popup_opened');
}
const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
}

//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

//константы и переменные
const popupEditProfile = document.querySelector('.popup_edit-profile'); //попап редактирования профиля
const popupOpenEditProfile = profileElement.querySelector('.profile__edit-button');
const popupCloseEditProfile = popupEditProfile.querySelector('.popup__close_edit-profile');
const formProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = profileElement.querySelector('.profile__name');
let profileJob = profileElement.querySelector('.profile__job');

//слушатели на открытие и закрытие
popupOpenEditProfile.addEventListener('click', (popupElement) => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupCloseEditProfile.addEventListener('click', (popupElement) => {
  closePopup(popupEditProfile);
});

//обработчик события на закрытие
function editHandleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//слушатель на обработчик по сабмит
formProfile.addEventListener('submit', editHandleFormSubmit);

//слушатель на обработчик по энтер
formProfile.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    editHandleFormSubmit();
  }
});

//ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ

//константы и переменные
const popupAddMesto = document.querySelector('.popup_add-mesto');
const popupOpenAddMesto = profileElement.querySelector('.profile__add-button');
const popupCloseAddMesto = popupAddMesto.querySelector('.popup__close_add-mesto');
const titleInput = document.querySelector('.popup__input_type_title');
const imageInput = document.querySelector('.popup__input_type_image');
const formMesto = document.querySelector('.popup__form_add-mesto');

//слушатели на открытие/закрытие
popupOpenAddMesto.addEventListener('click', (popupElement) => {
  openPopup(popupAddMesto);
});

popupCloseAddMesto.addEventListener('click', (popupElement) => {
  closePopup(popupAddMesto);
});

//обработчик события
function addHandleFormSubmit (evt) {
  evt.preventDefault();
  const newMesto = createMestoElement(titleInput.value, imageInput.value);
  mestoList.prepend(newMesto);
  closePopup(popupAddMesto);
  titleInput.value = '';
  imageInput.value = '';
}

//слушатель на обработчик по сабмит
formMesto.addEventListener('submit', addHandleFormSubmit);

//слушатель на обработчик по энтер
formMesto.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    addHandleFormSubmit();
  };
});


//Adding initial cards in html via template-method
const initialCards = [
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
const mestoList = document.querySelector('.mesto__list'); //ul-container with cards in html
const mestoTemplate = document.querySelector('#mesto-template').content;

//СОЗДАНИЕ КАРТОЧКИ

const createMestoElement = (name, link) => {
  //создание DOM-элемента из темплейт, наполнение его содержимым
  const mestoElement = mestoTemplate.querySelector('.mesto__item').cloneNode(true);
  mestoElement.querySelector('.mesto__image').src= link;
  mestoElement.querySelector('.mesto__title').textContent = name;
  mestoElement.querySelector('.mesto__image').alt = name;

  //слушатель на корзину
  mestoElement.querySelector('.mesto__delete-button').addEventListener('click', (evt) => {
    evt.target.closest('.mesto__item').remove();
  });

  //слушатель на лайк
  mestoElement.querySelector('.mesto__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('mesto__like-button_active');
  });

  //константы для открытия/закрытия просмотра изображения
  const popupImg = document.querySelector('.popup_img');
  const popupOpenImg = mestoElement.querySelector('.mesto__image');
  const popupCloseImg = popupImg.querySelector('.popup__close_img');
  const popupCaption = popupImg.querySelector('.popup__caption');
  const popupImage = popupImg.querySelector('.popup__image');

  //слушатели на открытие/закрытие
  popupOpenImg.addEventListener('click', (popupElement) => {
    openPopup(popupImg);
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
  });

  popupCloseImg.addEventListener('click', (popupElement) => {
    closePopup(popupImg);
  });

  //возвращаем dom-элемент карточки
  return mestoElement;
};

//добавляем dom-элемент в разметку
const renderMestoElement = (name, link) => {
  mestoList.append(createMestoElement(name, link));
};

//добавляем 6 карточек перебором массива
initialCards.forEach((item) => {
  renderMestoElement(item.name, item.link);
});














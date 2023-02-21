//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
const profileElement = document.querySelector('.profile');
//const popupElement = document.querySelector('.popup'); это некорректная переменная, я ее не использую, для каждого попапа у меня есть константа с поиском их модификаторов
//const formElement = popupElement.querySelector('.popup__form'); тоже некорректно я ее объявила вначале, либо через querySelectorAll надо выводить колекцию всех форм, но в проекте я не использую это
const popupEditProfile = document.querySelector('.popup_edit-profile'); //попап редактирования профиля
const buttenOpenPopupProfile = profileElement.querySelector('.profile__edit-button');
const buttenClosePopupProfile = popupEditProfile.querySelector('.popup__close_edit-profile');
const formProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');//заменила formElement на document, т.к. по сути неправильная была переменная, она бы не нашла мне эти формы, если бы они были не первыми в html
const jobInput = document.querySelector('.popup__input_type_job');// то же самое
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__job');
const popupAddMesto = document.querySelector('.popup_add-mesto');
const popupOpenAddMesto = profileElement.querySelector('.profile__add-button');
const popupCloseAddMesto = popupAddMesto.querySelector('.popup__close_add-mesto');
const titleInput = document.querySelector('.popup__input_type_title');
const imageInput = document.querySelector('.popup__input_type_image');
const formMesto = document.querySelector('.popup__form_add-mesto');
const popupImg = document.querySelector('.popup_img');
const popupCloseImg = popupImg.querySelector('.popup__close_img');
const mestoList = document.querySelector('.mesto__list'); //ul-container with cards in html

//ФУНКЦИИ
// функции открытия и закрытия попапов

const closePopupByOverlay = (evt) => {
  const popupOpened = document.querySelector('.popup_opened')
	if(evt.target === popupOpened) {
    closePopup(popupOpened);
	}
}

const closePopupByEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened')
	if( evt.key === 'Escape') {
		closePopup(popupOpened);
	}
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = function(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
}


//popupEditProfile.addEventListener('click', closePopupByOverlay);
//document.addEventListener('keydown', closePopupByEsc);
//

//присвоим переменную функции открытия попапа редактирования профиля для улучшения читаемости слушателя
const openEditProfilePopup = () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};


  //функция созадния карточки
  const createMestoElement = (name, link) => {
    //создание DOM-элемента из темплейт, наполнение его содержимым
    const mestoTemplate = document.querySelector('#mesto-template').content;
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


    const popupOpenImg = mestoElement.querySelector('.mesto__image');

    const popupCaption = popupImg.querySelector('.popup__caption');
    const popupImage = popupImg.querySelector('.popup__image');


    //слушатели на открытие модального окна с картинкой
    popupOpenImg.addEventListener('click', (popupElement) => {
      openPopup(popupImg);
      popupCaption.textContent = name;
      popupImage.src = link;
      popupImage.alt = name;
    });

    //возвращаем dom-элемент карточки
    return mestoElement;
  };

  //добавляем dom-элемент в разметку
  const renderMestoElement = (name, link) => {
    mestoList.append(createMestoElement(name, link));
  };


  //добавляем 6 карточек перебором массива
  //МАССИВ С НАЧАЛЬНЫМИ КАРТОЧКАМИ ВЫНЕСЛИ В ОТДЕЛЬНЫЙ ФАЙЛ
  initialCards.forEach((item) => {
    renderMestoElement(item.name, item.link);
  });


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



//слушатели на открытие/закрытие попапа новой карточки
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
  evt.target.reset();//очищаем поля формы с помощью метода формы reset вместо способа ниже
  //titleInput.value = '';
  //imageInput.value = '';
}

//слушатель на обработчик по сабмит
formMesto.addEventListener('submit', addHandleFormSubmit);




//слушатели на закрытие модального окна с картинкой
popupCloseImg.addEventListener('click', (popupElement) => {
  closePopup(popupImg);
  });













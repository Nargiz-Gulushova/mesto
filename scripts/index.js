
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
    const mestoImage = mestoElement.querySelector('.mesto__image');
    const mestoTitle = mestoElement.querySelector('.mesto__title');//для тайтл также сделала константу для читабельности кода
    mestoImage.src= link;
    mestoImage.alt = name;
    mestoTitle.textContent = name;

    //слушатель на корзину
    mestoElement.querySelector('.mesto__delete-button').addEventListener('click', (evt) => {
      evt.target.closest('.mesto__item').remove();
    });

    //слушатель на лайк
    mestoElement.querySelector('.mesto__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('mesto__like-button_active');
    });


    const popupOpenImg = mestoElement.querySelector('.mesto__image');


    //слушатели на открытие модального окна с картинкой
    popupOpenImg.addEventListener('click', (popupElement) => {
      popupCaption.textContent = name;
      popupImage.src = link;
      popupImage.alt = name;
      openPopup(popupImg);
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

const openAddMestoPopup = () => {
  openPopup(popupAddMesto);
}

//слушатели на открытие/закрытие попапа новой карточки
popupOpenAddMesto.addEventListener('click', () => {
  openAddMestoPopup();
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
  evt.target.reset();
  //const popupOpened = document.querySelector('.popup_opened');
  //popupOpened.querySelector('.popup__submit_button').disabled = true;
}

//слушатель на обработчик по сабмит
formMesto.addEventListener('submit', addHandleFormSubmit);




//слушатели на закрытие модального окна с картинкой
popupCloseImg.addEventListener('click', (popupElement) => {
  closePopup(popupImg);
  });













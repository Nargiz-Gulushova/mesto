export default class Mesto {
  constructor (data, userId, templateSelector, handlers) {
    this._cardData = data; // данные карточки
    this._link = this._cardData.link; // ссылка на изображение
    this._name = this._cardData.name; // название карточки
    this._currentUserId = userId; // текущий ID пользователя
    this._cardId = this._cardData._id; // ID карточки
    this._cardOwnerId = this._cardData.owner._id; // ID владельца карточки
    this._templateSelector = templateSelector;
    this._handleImageClick = handlers.handleImageClick; // коллбэк полноразмерного изображения
  }
  //создание DOM-элемента из темплейт
  _getTemplate() {
    const mestoElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.mesto__item')
      .cloneNode(true);

    return mestoElement;
  }
  //наполнение его содержимым
  generateMesto() {
    this._element = this._getTemplate();

    this._mestoImage = this._element.querySelector('.mesto__image');
    this._mestoTitle = this._element.querySelector('.mesto__title'); //для тайтл также сделала константу для читабельности кода
    this._mestoLikeButton = this._element.querySelector('.mesto__like-button'); // переменная для кнопки лайка
    this._mestoDeleteButton = this._element.querySelector('.mesto__delete-button'); // переменная для кнопки удаления
    this._mestoImage.src= this._link;
    this._mestoImage.alt = this._name;
    this._mestoTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  };

  _deleteMesto() {
    this._element.remove()
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('mesto__like-button_active');
  }

  _setEventListeners () {
    this._mestoLikeButton.addEventListener ('click', this._toggleLike);
    this._mestoDeleteButton.addEventListener('click', () => {
      this._deleteMesto();
    });
    this._mestoImage.addEventListener('click', () => this._handleImageClick(this._name, this._image));
  }
};



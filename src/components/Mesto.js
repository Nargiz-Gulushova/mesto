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
    this._handlePutLike = handlers.handlePutLike; // коллбэк на постановку лайка
    this._handleDeleteLike = handlers.handleDeleteLike; // коллбэк на удаление лайка
  }
  // создание DOM-элемента из темплейт
  _getTemplate() {
    const mestoElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.mesto__item')
      .cloneNode(true);

    return mestoElement;
  }
  // наполнение его содержимым
  generateMesto() {
    this._element = this._getTemplate();

    this._mestoImage = this._element.querySelector('.mesto__image');
    this._mestoTitle = this._element.querySelector('.mesto__title'); //для тайтл также сделала константу для читабельности кода
    this._mestoLikeButton = this._element.querySelector('.mesto__like-button'); // переменная для кнопки лайка
    this._mestoDeleteButton = this._element.querySelector('.mesto__delete-button'); // переменная для кнопки удаления
    this._mestoLikeCounter = this._element.querySelector('.mesto__like-counter'); // параграф для количества лайков
    this._mestoImage.src= this._link;
    this._mestoImage.alt = this._name;
    this._mestoTitle.textContent = this._name;

    this.renderLikes(this._cardData); // рендер лайков у первоначальных карточек
    this._setEventListeners();
    return this._element;
  };
  // рендер лайков у карточек
  renderLikes(data) {
    this._likeList = data.likes;

    this._likeCount = this._likeList.length;
    this._mestoLikeCounter.textContent = this._likeCount;

    if (this._isLiked()) {
      this._mestoLikeButton.classList.add('mesto__like-button_active');
    } else {
      this._mestoLikeButton.classList.remove('mesto__like-button_active');
    }
  };
  // проверка лайка у карточки
  _isLiked() {
    return this._likeList.find(user => this._currentUserId === user._id);
  };

  _deleteMesto() {
    this._element.remove();
  };
  // переключение кнопки лайка
  _toggleLike() {
    if (this._isLiked()) { // если лайк есть, то коллбэк на удаление лайка
      this._handleDeleteLike(this._cardId);
    } else { // если нет, то на постановку лайка
      this._handlePutLike(this._cardId);
    }
  };

  _setEventListeners () {
    // кнопка лайка
    this._mestoLikeButton.addEventListener ('click', () => this._toggleLike());
    // кнопка удаления с проверкой на владельца карточки
    if (this._currentUserId === this._cardOwnerId) {
      this._mestoDeleteButton.addEventListener('click', () => this._deleteMesto());
    } else {
      this._mestoDeleteButton.remove();
    }
    // открытие полноразмерного изображения
    this._mestoImage.addEventListener('click', () => this._handleImageClick(this._name, this._link));
  }
};



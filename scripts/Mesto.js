export default class Mesto {
  constructor (data, templateSelector, handleImageClick) {
    this._image = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
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
    this._setEventListeners();

    this._mestoImage = this._element.querySelector('.mesto__image');
    this._mestoTitle = this._element.querySelector('.mesto__title');//для тайтл также сделала константу для читабельности кода
    this._mestoImage.src= this._image;
    this._mestoImage.alt = this._name;
    this._mestoTitle.textContent = this._name;


    return this._element;
  };

  _deleteMesto() {
    this._element.remove()
    //evt.target.closest('.mesto__item').remove();
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('mesto__like-button_active');
  }

  _setEventListeners () {
    this._element.querySelector('.mesto__like-button').addEventListener ('click', this._toggleLike);
    this._element.querySelector('.mesto__delete-button').addEventListener('click', () => {
      this._deleteMesto();
    });
    this._element.querySelector('.mesto__image').addEventListener('click', () => {
      this._handleImageClick(this._name, this._image);
    });
  }

};



export default class Section {
  constructor ({renderer}, templateSelector) {  //this.items = items;
    this._renderer = renderer;
    this._templateSelector = templateSelector;
    this._mestoList = document.querySelector('.mesto__list')
  }

  // метод для добавления первоначальных карточек через внешнюю функцию рендерер
  renderItems(items) {
    this.items = items;
    this.items.forEach((item) => this._renderer(item))
  }

  // метод добавления новой карточки в разметку в начало списка
  addItem(itemHtml) {
    this._mestoList.prepend(itemHtml)
  }
}




export default class Section {
  constructor ({renderer}, containerSelector) {
    this._renderer = renderer;
    // this._templateSelector = templateSelector;
    this._mestoList = document.querySelector(containerSelector);
  }

  // метод для добавления первоначальных карточек через внешнюю функцию рендерер
  renderItems(items) {
    items.forEach((item) => this._renderer(item))
  }

  // метод добавления новой карточки в разметку в начало списка
  addItem(itemHtml) {
    this._mestoList.prepend(itemHtml)
  }
}




export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  render() {
    //for (let i = 0; i <= 5; i++) {
    //  this._renderer(this._initialArray[i]);
    //}
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}

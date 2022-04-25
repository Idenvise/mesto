export default class Section {
  constructor( {items, renderer}, container ) {
    this._items = items;
    this._container = container;
    this._renderer = renderer;
  }
  addItem(item) {
    this._container.prepend(item);
  }
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}

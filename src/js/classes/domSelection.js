export default class DOMSelection {
  constructor(selector) {
    this.elems = document.querySelectorAll(selector);
  }

  items() {
    return Array.prototype.slice.call(this.elems);
  }

  first() {
    return this.elems[0];
  }

  last() {
    return this.elems[this.elems.length - 1];
  }

  addClass(className) {
    this.items().forEach(function (elem) {
      elem.classList.add(className);
    });
  }

  removeClass(className) {
    this.items().forEach(function (elem) {
      elem.classList.remove(className);
    });
  }
}

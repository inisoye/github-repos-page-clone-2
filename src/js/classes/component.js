export default class Component {
  constructor(selector, options) {
    this.elem = document.querySelector(selector);
    this.data = options.data;
    this.template = options.template;
  }

  render() {
    this.elem.innerHTML = this.template(this.data);
  }
}

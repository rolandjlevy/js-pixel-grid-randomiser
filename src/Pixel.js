import UI from './UI.js';
import Tooltip from './Tooltip.js';

export default class Pixel {
  constructor({id, x, y}) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.col = '';
    this.init();
  }
  init() {
    this.li = document.createElement('li');
    this.li.setAttribute('data-id', this.id);
    this.li.addEventListener("click", (e) => {
      const rect = this.getPos();
      Tooltip.show(rect, this.col);
    });
  }
  setColour(hex) {
    this.col = hex;
  }
  static getPixel(id, pixels) {
    const found = pixels.find(item => item.id == id);
    return { id, found };
  }
  static nextPos(id, x, y, size) {
    const next = [
      {id:id - 1, x:x - 1, y}, 
      {id:id + 1, x:x + 1, y},
      {id:id - size, x, y:y - 1},
      {id:id + size, x, y:y + 1}
    ];
    const eligible = next.filter(({id, x, y}) => {
      return (x > 0 && x <= size) && (y > 0 && y <= size)
    });
    const randomPos = Math.floor(Math.random() * Math.floor(eligible.length));
    return eligible[randomPos].id;
  }
  getPos() {
    const { top, right, bottom, left } = this.li.getBoundingClientRect();
    return { top, right, bottom, left };
  }
}
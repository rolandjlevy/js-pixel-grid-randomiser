import UI from './UI.js';

export default class Tooltip {
  constructor() {
  }
  static show(rect, col) {
    const span = document.createElement('span');
    span.classList.add('tooltip');
    UI.$('.container').appendChild(span);
    UI.$('.tooltip').style.top = rect.top + 'px';
    UI.$('.tooltip').style.left = rect.left + 'px';
    UI.$('.tooltip').innerText = '#' + col;
  }
}
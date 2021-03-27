import UI from './UI.js';

export default class Tooltip {
  constructor() {
  }
  static show(rect, col) {
    const tooltip = UI.$('.tooltip');
    tooltip && UI.$('.container').removeChild(tooltip);
    const span = document.createElement('span');
    span.classList.add('tooltip');
    UI.$('.container').appendChild(span);
    UI.$('.tooltip').style.top = rect.top + 'px';
    UI.$('.tooltip').style.left = rect.left + 'px';
    UI.$('.tooltip').innerText = col;
  }
  static remove() {
    const tooltip = UI.$('.tooltip');
    tooltip && UI.$('.container').removeChild(tooltip);
  }
}
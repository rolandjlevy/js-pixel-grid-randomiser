import Pixel from './src/Pixel.js';
import Shapes from './src/Shapes.js';
import UI from './src/UI.js';

const pixels = [];
const gridSize = 20;
const totalPixels = gridSize * gridSize;

const maxMoves = parseInt('ffffff', 16);
let moves = parseInt('aa0000', 16);
let currentId = Math.floor(Math.random() * Math.floor(totalPixels)) + 1;
let counter = 0;
let speed = Number(UI.$('#slider').value);
const maxSpeed = Number(UI.$('#slider').max);
let timerId;
let playState = false;

let pattern = [];

// create the pixel grid
while (counter++ < totalPixels) {
  const pixel = new Pixel({
    id: counter,
    x: counter % gridSize || gridSize,
    y: Math.ceil(counter/gridSize),
    pattern
  });
  UI.$('.grid').appendChild(pixel.li);
  pixels.push(pixel);
  pattern.push(counter);
}

// fade in
UI.$('.grid').style.animationPlayState = 'running';

// Play / pause button
UI.$('button.toggle').addEventListener('click', (e) => {
  playState = !playState;
  playState ? play() : pause();
  e.target.textContent = playState ? 'PAUSE' : 'PLAY';
});

function play() {
  if (!playState) return;
  timerId = setInterval(() => {
    const px = Pixel.getPixel(currentId, pixels);
    currentId = Pixel.nextPos(px.id, px.found.x, px.found.y, gridSize);
    const hex = moves.toString(16).padStart(6,'0').toUpperCase();
    px.found.setColour(hex);
    UI.$('.hex').textContent = `#${hex}`;
    UI.$('.swatch').style.background = `#${hex}`;
    const col = pattern.includes(currentId) ? `#${hex}` : `#${hex}33`;
    UI.$(`li[data-id='${currentId}']`).style.background = col;
    moves = moves > maxMoves ? 0 : moves;
    moves += 100;
  }, speed);
}

function pause() {
  clearInterval(timerId);
}

// Set speed
UI.$('#slider').addEventListener('input', (e) => {
  speed = maxSpeed - Number(e.target.value);
  pause();
  play();
});

// Set current colour
UI.$('#colour-picker').addEventListener('input', (e) => {
  const col = e.target.value;
  const hex = col.slice(1, col.length).toUpperCase();
  UI.$('.hex').textContent = `#${hex}`;
  UI.$('.swatch').style.background = `#${hex}`;
  moves = parseInt(hex, 16);
});

// Remove tooltip
document.addEventListener('click', (e) => {
  const clickedInside = UI.$('.grid').contains(e.target);
  if (!clickedInside) {
    const tooltip = UI.$('.tooltip');
    if (tooltip) {
      UI.$('.container').removeChild(tooltip);
    }
  }
});

// Preset shapes
const shapes = new Shapes();
let prevSelected;

UI.$$('.shape').forEach(btn => {
  btn.addEventListener('click', (e) => {
    prevSelected && prevSelected.classList.remove('selected');
    e.target.classList.add('selected');
    prevSelected = e.target;
    const selected = e.target.dataset.pattern;
    pattern = [];
    UI.$$('.grid > li').forEach(li => li.style.background = '#111');
    pattern = shapes[selected];
  })
});


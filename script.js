import Pixel from './src/Pixel.js';
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

while (counter++ < totalPixels) {
  const pixel = new Pixel({
    id: counter,
    x: counter % gridSize || gridSize,
    y: Math.ceil(counter/gridSize)
  });
  UI.$('.grid').appendChild(pixel.li);
  pixels.push(pixel);
}

UI.$('.grid').style.animationPlayState = 'running';

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
    UI.$(`li[data-id='${currentId}']`).style.background = `#${hex}`;
    moves = moves > maxMoves ? 0 : moves;
    moves += 100;
  }, speed);
}

function pause() {
  clearInterval(timerId);
}

UI.$('#slider').addEventListener('input', (e) => {
  speed = maxSpeed - Number(e.target.value);
  pause();
  play();
});

UI.$('#colour-picker').addEventListener('input', (e) => {
  const col = e.target.value;
  const hex = col.slice(1, col.length).toUpperCase();
  UI.$('.hex').textContent = `#${hex}`;
  UI.$('.swatch').style.background = `#${hex}`;
  moves = parseInt(hex, 16);
});

document.addEventListener('click', (e) => {
  const clickedInside = UI.$('.grid').contains(e.target);
  if (!clickedInside) {
    UI.$('.tooltip').style.top = '-1000px';
    UI.$('.tooltip').style.left = '-1000px';
  }
});
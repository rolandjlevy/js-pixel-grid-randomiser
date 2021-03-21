import Pixel from './src/Pixel.js';

const $ = (selector) => document.querySelector(selector);

const pixels = [];
const gridSize = 10;
const totalPixels = gridSize * gridSize;
let counter = 0;
let moves = 0;
let currentId = Math.floor(Math.random() * Math.floor(totalPixels)) + 1;

let speed = Number($('#slider').value);
const maxSpeed = Number($('#slider').max);
let timerId;
let playState = false;

while (counter++ < totalPixels) {
  const pixel = new Pixel({
    id: counter,
    x: counter % gridSize || gridSize,
    y: Math.ceil(counter/gridSize)
  });
  $('.grid').appendChild(pixel.li);
  pixels.push(pixel);
}

$('button.toggle').addEventListener('click', (e) => {
  playState = !playState;
  playState ? play() : pause();
  e.target.textContent = playState ? 'PAUSE' : 'PLAY';
});

function play() {
  if (!playState) return;
  timerId = setInterval(() => {
    const px = Pixel.getPixel(currentId, pixels);
    currentId = Pixel.nextPos(px.id, px.x, px.y, gridSize);
    const hex = moves.toString(16).padStart(6,'0').toUpperCase();
    $('.hex').textContent = `#${hex}`;
    $(`li[data-id='${currentId}']`).style.background = `#${hex}`;
    $('.swatch').style.background = `#${hex}`;
    moves += 100;
  }, speed);
}

function pause() {
  clearInterval(timerId);
}

$('#slider').addEventListener('input', (e) => {
  speed = maxSpeed - Number(e.target.value);
  pause();
  play();
});
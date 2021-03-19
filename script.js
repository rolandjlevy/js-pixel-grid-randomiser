const max = 100;
let counter = 0;
let moves = 0;
const $ = (selector) => document.querySelector(selector);
let timerId;
let playState = false;

function getRandomHex() {
  const convertedMax = parseInt('ffffff', 16);
  const randomNum = Math.floor(Math.random() * Math.floor(convertedMax));
  return randomNum.toString(16).padEnd(6,'0').toUpperCase();
}

function setPixel() {
  const rand = Math.floor(Math.random() * Math.floor(max)) + 1;
  const pixel = $(`li[data-id='${rand}']`);
  pixel.style.background = `#${getRandomHex()}`;
}

while (counter++ < max) {
  const li = document.createElement('li');
  li.setAttribute('data-active', 'false');
  li.setAttribute('data-id', counter);
  li.setAttribute('data-x', counter % 10 || 10);
  li.setAttribute('data-y', Math.ceil(counter/10));
  li.addEventListener('click', (e) => {
    const { active, x, y, id } = e.target.dataset;
    const state = active === 'false' ? 'true' : 'false';
    // setPixel();
    li.setAttribute('data-active', state);
  });
  $('.grid').appendChild(li);
}

function nextPos(idNum, xPos, yPos) {
  const id = Number(idNum);
  const x = Number(xPos);
  const y = Number(yPos);
  const next = [
    {id:id - 1, x:x - 1, y}, 
    {id:id + 1, x:x + 1, y},
    {id:id - 10, x, y:y - 1},
    {id:id + 10, x, y:y + 1}
  ];
  const eligible = next.filter(({id, x, y}) => (x > 0 && x <= 10) && (y > 0 && y <= 10));
  const randomPos = Math.floor(Math.random() * Math.floor(eligible.length));
  currentNum = eligible[randomPos].id;
  return currentNum;
}

let currentNum = Math.floor(Math.random() * Math.floor(max)) + 1;

function getPixel(num) {
  const x = $(`li[data-id='${num}']`).getAttribute('data-x');
  const y = $(`li[data-id='${num}']`).getAttribute('data-y');
  return {num, x, y};
}

function play() {
  timerId = setInterval(() => {
    // setPixel();
    const px = getPixel(currentNum);
    const next = nextPos(px.num, px.x, px.y);
    const hex = moves.toString(16).padEnd(6,'0').toUpperCase();
    $('.hex').textContent = `#${hex}`;
    $(`li[data-id='${next}']`).style.background = `#${hex}`;
    moves += 1;
  }, 50);
}

function pause() {
  clearInterval(timerId);
}

$('button').addEventListener('click', (e) => {
  playState = !playState;
  playState ? play() : pause();
  e.target.textContent = playState ? 'PAUSE' : 'PLAY';
});
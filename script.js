const context = new AudioContext();
var img = new Image();

let canvas = null;
let context2D = null;

const handleStart = (event) => {
  
}

const loadImage = () => {
  const file = 'https://cdn.glitch.com/e3d07aa6-332d-4c23-83e2-1bb0fee35f02%2Ftestimage.jpg?v=1575693604586';
  const response = fetch(file);
  
}

const setup = async () => {
  canvas = document.getElementByID('image');
  context2D = canvas.getContext('2d');
  
  loadImage();
  const buttonElement = document.querySelector('#start');
  buttonElement.addEventListener('click', handleStart, {once: true});
}
window.addEventListener('load', setup, {once: true});
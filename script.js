const context = new AudioContext();
var img = new Image();

let canvas = null;
let context2D = null;

const setup = async () => {
  canvas = document.getElementByID('image');
  context2D = canvas.getContext('2d');
}
window.addEventListener('load', setup, {once: true});
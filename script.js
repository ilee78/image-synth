const context = new AudioContext();

const image = new Image();
var red = [];
var green = [];
var blue = [];
var alpha = [];
var imageData = new ImageData(200, 200);

let canvas = null;
let context2D = null;
//let imageData = new ImageData(200, 200);
//const imageData = context2D.createImageData(200, 200);

const handleStart = (event) => {
  image.src = 'https://cdn.glitch.com/e3d07aa6-332d-4c23-83e2-1bb0fee35f02%2Ftestimage.jpg?v=1575693604586';
  image.onload();
  //let imageData = context2D.getImageData(0, 0, 200, 200);
  console.log(imageData);
  
  let x = 0;
  let y = 0;
  let i = 0;

}

image.onload = function() {
  context2D.drawImage(image, 0, 0);
  console.log(context2D.getImageData(0, 0, 200, 200).data);
  
}


const setup = async () => {
  canvas = document.getElementById('image');
  context2D = canvas.getContext('2d');
  
  //const file = 'https://cdn.glitch.com/e3d07aa6-332d-4c23-83e2-1bb0fee35f02%2Ftestimage.jpg?v=1575693604586';
  //const response = await fetch(file);
  
  const buttonElement = document.querySelector('#start');
  buttonElement.addEventListener('click', handleStart, {once: true});
}
window.addEventListener('load', setup, {once: true});
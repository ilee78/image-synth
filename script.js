const context = new AudioContext();
//var imageData = [];
const image = new Image();

let canvas = null;
let context2D = null;
let imageData = new ImageData(200, 200);

const handleStart = (event) => {
  image.src = 'https://cdn.glitch.com/e3d07aa6-332d-4c23-83e2-1bb0fee35f02%2Ftestimage.jpg?v=1575693604586';
  image.onload();
  imageData = context2D.getImageData(0, 0, 200, 200).data;
  console.log(imageData);
}

image.onload = function() {
  context2D.drawImage(image, 0, 0);
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
const context = new AudioContext();

const image = new Image();
const red = [];
const green = [];
const blue = [];
const alpha = [];
var imageData = new ImageData(200, 200);

let canvas = null;
let context2D = null;

const handleStart = (event) => {
  image.src = 'https://cdn.glitch.com/e3d07aa6-332d-4c23-83e2-1bb0fee35f02%2Ftestimage.jpg?v=1575693604586';
  image.onload();

}

image.onload = function() {
  image.crossOrigin = "Anonymous";
  context2D.drawImage(image, 0, 0);
  imageData = context2D.getImageData(0, 0, 200, 200).data;
  createPixelArrays(imageData); 
}

const createPixelArrays = (imageData) => {
  // separating into RGBA arrays
  for(let i = 0; i < imageData.length; i += 4) {
    let index = i / 4;
    red[index] = imageData[i];
    green[index] = imageData[i + 1];
    blue[index] = imageData[i + 2];
    alpha[index] = imageData[i + 3];
  }
  // averaging 100 values at a time
  for(let i = 0; i < 40000; i += 100) {
    
    red.slice(i, i + 99);
    green.slice(i, i + 99);
    blue.slice(i, i + 99);
    
  }
  console.log(red);
  console.log(green);
  console.log(blue);
  console.log(alpha);
}


const setup = async () => {
  canvas = document.getElementById('image');
  context2D = canvas.getContext('2d');
  
  const buttonElement = document.querySelector('#start');
  buttonElement.addEventListener('click', handleStart, {once: true});
}
window.addEventListener('load', setup, {once: true});
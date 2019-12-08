const context = new AudioContext();

const image = new Image();
// var red = [];
// var green = [];
// var blue = [];
// var alpha = [];
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
  //console.log(imageData);  
}

const createPixelArrays = (imageData) => {
   red = [];
  var green = [];
  var blue = [];
  var alpha = [];
  for(let i = 0; i < imageData.length; i += 4) {
    red.push(imageData[i]);
    green.push(imageData[i + 1]);
    blue.push(imageData[i + 2]);
    alpha.push(imageData[i + 3]);
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
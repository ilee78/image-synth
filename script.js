import SoundModule from './SoundModule.js';
import ImageMap from './ImageMap.js';

const context = new AudioContext();

const ana = new AnalyserNode(context);
const waveformData = new Float32Array(2048);
const frequencyData = new Float32Array(2048);

var image = new Image();
image.crossOrigin = "Anonymous";

const r = [];
const g = [];
const b = [];
const a = [];
var imageData = [];

let canvas = null;
let context2D = null;
let redAnalyzer = null;
let redContext = null;

// Handles the event when start button is clicked
// Separates and organizes pixel data, and passes into SoundModule
// Renders the waveform analyzer
const handleStart = (event) => {
  createPixelArrays(imageData);
  renderAnalyzer();
}

// Draws image onto the canvas and reads pixel data into imageData
image.onload = function() {
  context2D.drawImage(image, 0, 0);
  imageData = context2D.getImageData(0, 0, 200, 200).data;
}

/*
 * Separates into four different arrays, averages over 100-pixel regions,
 * and inputs these values into new, condensed arrays. Passes these arrays
 * into a SoundModule object.
 */
const createPixelArrays = (imageData) => {
  // separating into RGBA arrays
  const red = [];
  const green = [];
  const blue = [];
  const alpha = [];
  for(let i = 0; i < imageData.length; i += 4) {
    let index = i / 4;
    red[index] = imageData[i];
    green[index] = imageData[i + 1];
    blue[index] = imageData[i + 2];
    alpha[index] = imageData[i + 3];
  }
  // averaging 100 values at a time
  for(let i = 0; i <= 40000; i += 100) {
    const redSlice = red.slice(i, i + 99);
    const greenSlice = green.slice(i, i + 99);
    const blueSlice = blue.slice(i, i + 99);
    const alphaSlice = alpha.slice(i, i + 99);
    var redSum = 0;
    var greenSum = 0;
    var blueSum = 0;
    var alphaSum = 0;
    for(let j = 0; j < redSlice.length; j++) {
      redSum += redSlice[j];
      greenSum += greenSlice[j];
      blueSum += blueSlice[j];
      alphaSum += alphaSlice[j];
    }
    const redAvg = redSum / 100;
    const greenAvg = greenSum / 100;
    const blueAvg = blueSum / 100;
    const alphaAvg = alphaSum / 100;
    r[i/100] = redAvg;
    g[i/100] = greenAvg;
    b[i/100] = blueAvg;
    a[i/100] = alphaAvg;
  }

  // Creates new SoundModule object, makes connections to speakers,
  // and calls the play function that takes in the respective pixel arrays
  const soundModule = new SoundModule(context, r, g, b, a);
  soundModule.output.connect(context.destination);
  soundModule.output.connect(ana);
  soundModule.play(r, g, b);
}

// Function that calls rendering of waveform analyzer recursively.
// Reference credits:
// https://github.com/ccrma/music220a/blob/master/09-nonlinear-effects/analyser/script.js
const renderAnalyzer = () => {
  redContext.clearRect(0, 0, redAnalyzer.width, redAnalyzer.height);
  renderWaveform();
  renderSpectrum();
  requestAnimationFrame(renderAnalyzer);
}

// Renders the spectrum of the sound from SoundModule output
const renderSpectrum = () => {
  ana.getFloatFrequencyData(frequencyData);
  const inc = redAnalyzer.width / (frequencyData.length * 0.5);
  redContext.beginPath();
  redContext.moveTo(0, redAnalyzer.height);
  for (let x = 0, i = 0; x < redAnalyzer.width; x += inc, ++i)
    redContext.lineTo(x, -frequencyData[i]);
  redContext.strokeStyle = "red";
  redContext.stroke();
}

// Renders the waveform of the sound from SoundModule output
const renderWaveform = () => {
  ana.getFloatTimeDomainData(waveformData);
  const inc = redAnalyzer.width / waveformData.length;
  redContext.beginPath();
  redContext.moveTo(0, redAnalyzer.height * 0.5);
  for (let x = 0, i = 0; x < redAnalyzer.width; x += inc, ++i)
    redContext.lineTo(x, (waveformData[i] * 0.5 + 0.5) * redAnalyzer.height);
  redContext.strokeStyle = 'rgba(0,0,255,0.25)';
  redContext.stroke();
}

/*
 * Creates button elements, adds event listeners, sets up canvas user interface.
 * Loads user's chosen image and disables all other buttons.
 */
const setup = async () => {
  canvas = document.getElementById('image');
  context2D = canvas.getContext('2d');
  
  const galaxyButton = document.getElementById("Galaxy");
  const mondrianButton = document.getElementById("Mondrian");
  const seuratButton = document.getElementById("Seurat");
  const vanButton = document.getElementById("Van-Gogh");
  
  const buttonElement = document.querySelector('#start');

  galaxyButton.addEventListener('click', function(){
    image.src = ImageMap[0];
    image.onload();
    galaxyButton.disabled = true;
    mondrianButton.disabled = true;
    seuratButton.disabled = true;
    vanButton.disabled = true;
  }, {once:true});
  mondrianButton.addEventListener('click', function() {
    image.src = ImageMap[1];
    image.onload();
    galaxyButton.disabled = true;
    mondrianButton.disabled = true;
    seuratButton.disabled = true;
    vanButton.disabled = true;
  }, {once:true});
  seuratButton.addEventListener('click', function() {
    image.src = ImageMap[2];
    image.onload();
    galaxyButton.disabled = true;
    mondrianButton.disabled = true;
    seuratButton.disabled = true;
    vanButton.disabled = true;
  }, {once:true});
  vanButton.addEventListener('click', function() {
    image.src = ImageMap[3];
    image.onload();
    galaxyButton.disabled = true;
    mondrianButton.disabled = true;
    seuratButton.disabled = true;
    vanButton.disabled = true;
  }, {once:true});
  
  redAnalyzer = document.querySelector('#red-analyzer');
  redContext = redAnalyzer.getContext('2d');

  buttonElement.addEventListener('click', handleStart, {once: true});
}
window.addEventListener('load', setup, {once: true});
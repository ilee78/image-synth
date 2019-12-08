import SoundModule from './SoundModule.js';

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

const handleStart = (event) => {
  console.log(imageData);
  createPixelArrays(imageData);
  //image.src = 'https://cdn.glitch.com/e3d07aa6-332d-4c23-83e2-1bb0fee35f02%2Ftestimage.jpg?v=1575693604586';
  //image.onload();
}

image.onload = function() {
  //image.crossOrigin = "Anonymous";
  context2D.drawImage(image, 0, 0);
  imageData = context2D.getImageData(0, 0, 200, 200).data;
  //console.log(imageData);
  // createPixelArrays(imageData); 
}


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

  const soundModule = new SoundModule(context, r, g, b, a);
  soundModule.output.connect(context.destination);
  soundModule.output.connect(ana);
  soundModule.play(r);
  
  console.log(r);
  // console.log(g);
  // console.log(b);
  // console.log(a);
}

const renderAnalyzer = () => {
  redContext.clearRect(0, 0, redAnalyzer.width, redAnalyzer.height);
  renderWaveform();
  renderSpectrum();
  requestAnimationFrame(renderAnalyzer);
}

// Renders the spectrum of the sound from SoundModule output
const renderSpectrum = () => {
  ana.getFloatFrequencyData(frequencyData);
  const inc = analyzer.width / (frequencyData.length * 0.5);
  contextAnalyzer.beginPath();
  contextAnalyzer.moveTo(0, analyzer.height);
  for (let x = 0, i = 0; x < analyzer.width; x += inc, ++i)
    contextAnalyzer.lineTo(x, -frequencyData[i]);
  contextAnalyzer.strokeStyle = "#ffffff";
  contextAnalyzer.stroke();
}

// Renders the waveform of the sound from EffectModule output
const renderWaveform = () => {
  ana.getFloatTimeDomainData(waveformData);
  const inc = analyzer.width / waveformData.length;
  contextAnalyzer.beginPath();
  contextAnalyzer.moveTo(0, analyzer.height * 0.5);
  for (let x = 0, i = 0; x < analyzer.width; x += inc, ++i)
    contextAnalyzer.lineTo(x, (waveformData[i] * 0.5 + 0.5) * analyzer.height);
  contextAnalyzer.strokeStyle = "#ffffff";
  contextAnalyzer.stroke();
}

const setup = async () => {
  canvas = document.getElementById('image');
  context2D = canvas.getContext('2d');
  
  const buttonElement = document.querySelector('#start');
  
  image.src = 'https://cdn.glitch.com/e3d07aa6-332d-4c23-83e2-1bb0fee35f02%2Ftestimage.jpg?v=1575693604586';
  image.onload();
  
  redAnalyzer = document.querySelector('#red-analyzer');
  redContext = redAnalyzer.getContext('2d');
  
  
  buttonElement.addEventListener('click', handleStart, renderAnalyzer, {once: true});

}
window.addEventListener('load', setup, {once: true});
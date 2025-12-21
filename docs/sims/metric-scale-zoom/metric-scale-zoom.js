// Metric Scale Zoom MicroSim
// This simulation helps students visualize the relative scale of metric prefixes
// and understand the logarithmic nature of metric measurements

// Canvas dimensions - REQUIRED structure
let canvasWidth = 500;              // Initial width (responsive)
let drawHeight = 400;                // Drawing/simulation area height
let controlHeight = 50;              // Controls area height
let canvasHeight = drawHeight + controlHeight;
let margin = 25;                     // Margin for visual elements
let sliderLeftMargin = 140;          // Left margin for slider positioning
let defaultTextSize = 16;            // Base text size

// Scale objects with their properties
let scaleObjects = [];
let currentObjectIndex = 4; // Start with person (meter scale)
let zoomSlider;

// Images
let images = {};
let imagesLoaded = false;

function preload() {
  // Load all images
  images.virus = loadImage('img/virus.png');
  images.hair = loadImage('img/hair.png');
  images.fingernail = loadImage('img/fingernail.png');
  images.textbook = loadImage('img/textbook.png');
  images.person = loadImage('img/person.png');
  images.footballField = loadImage('img/football-field.png');
  images.state = loadImage('img/state.png');
  images.earth = loadImage('img/earth.png');
  images.solar = loadImage('img/solar.png');
  images.galaxy = loadImage('img/galaxy.png');
}

function setup() {
  // Initialize scale objects (size in meters)
  scaleObjects = [
    { name: 'Virus', size: 100e-9, prefix: 'nano', unit: 'nm', value: 100, image: images.virus, exponent: -7 },
    { name: 'Human Hair Width', size: 100e-6, prefix: 'micro', unit: 'μm', value: 100, image: images.hair, exponent: -4 },
    { name: 'Fingernail Width', size: 0.01, prefix: 'centi', unit: 'cm', value: 1, image: images.fingernail, exponent: -2 },
    { name: 'Textbook Height', size: 0.25, prefix: 'centi', unit: 'cm', value: 25, image: images.textbook, exponent: -1 },
    { name: 'Person Height', size: 1.7, prefix: 'base', unit: 'm', value: 1.7, image: images.person, exponent: 0 },
    { name: 'Football Field', size: 100, prefix: 'hecto', unit: 'm', value: 100, image: images.footballField, exponent: 2 },
    { name: 'State Width', size: 400000, prefix: 'kilo', unit: 'km', value: 400, image: images.state, exponent: 5 },
    { name: 'Earth Diameter', size: 12742000, prefix: 'mega', unit: 'Mm', value: 12.742, image: images.earth, exponent: 7 },
    { name: 'Solar System Diameter', size: 287.46e11, prefix: 'tera', unit: 'Tm', value: 28.746, image: images.solar, exponent: 13 },
    { name: 'Galaxy Diameter', size: 9.461e20, prefix: 'exa', unit: 'Em', value: 946.1, image: images.galaxy, exponent: 20 }
  ];

  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create zoom slider
  zoomSlider = createSlider(0, scaleObjects.length - 1, currentObjectIndex, 1);
  zoomSlider.position(sliderLeftMargin, drawHeight + 10);
  zoomSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Interactive visualization showing objects at different metric scales from nanometers to millions of kilometers, with a slider to zoom between scale levels', LABEL);

  imagesLoaded = true;
}

function draw() {
  updateCanvasSize();

  // Drawing area (light blue background)
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, width, drawHeight);

  // Control area (white background)
  fill('white');
  rect(0, drawHeight, width, controlHeight);

  // Get current object from slider
  currentObjectIndex = zoomSlider.value();
  let currentObject = scaleObjects[currentObjectIndex];

  // Draw title
  fill('black');
  textSize(28);
  textAlign(CENTER, TOP);
  noStroke();
  text('Metric Scale Zoom', canvasWidth/2, margin);

  // Draw the current object image
  if (imagesLoaded && currentObject.image) {
    let imgWidth = 200;
    let imgHeight = 200;
    let imgX = canvasWidth/2 - imgWidth/2;
    let imgY = 80;

    imageMode(CORNER);
    image(currentObject.image, imgX, imgY, imgWidth, imgHeight);
  }

  // Draw object name and measurement
  textSize(20);
  textAlign(CENTER, CENTER);
  fill('navy');
  text(currentObject.name, canvasWidth/2, 300);

  // Draw measurement with prefix
  textSize(18);
  fill('darkgreen');
  let measurementText = formatMeasurement(currentObject);
  text(measurementText, canvasWidth/2, 330);

  // Draw scale information with superscript exponent
  textSize(14);
  fill('black');
  textAlign(CENTER, BASELINE);
  let exponent = Math.round(Math.log10(currentObject.size));
  let baseText = 'Scale: 10';
  let exponentText = exponent.toString();
  let suffixText = ' meters';

  // Calculate positions for proper superscript alignment
  let baseWidth = textWidth(baseText);
  let exponentWidth = textWidth(exponentText);
  let suffixWidth = textWidth(suffixText);
  let totalWidth = baseWidth + exponentWidth + suffixWidth;
  let startX = canvasWidth/2 - totalWidth/2;

  // Draw base text "Scale: 10"
  text(baseText, startX + baseWidth/2, 360);

  // Draw exponent in smaller text, raised
  textSize(10);
  text(exponentText, startX + baseWidth + exponentWidth/2, 354);

  // Draw suffix " meters"
  textSize(14);
  text(suffixText, startX + baseWidth + exponentWidth + suffixWidth/2, 360);

  // Reset text alignment and size for controls
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Draw slider label and value
  fill('black');
  noStroke();
  text('Zoom Level: ' + (currentObjectIndex + 1) + '/' + scaleObjects.length, 10, drawHeight + 20);
}

function formatMeasurement(obj) {
  // Format the measurement with appropriate unit
  let formattedValue = obj.value.toFixed(2);
  if (obj.value >= 100) {
    formattedValue = obj.value.toFixed(0);
  } else if (obj.value >= 10) {
    formattedValue = obj.value.toFixed(1);
  }

  // Get full unit name
  let fullUnitName = getFullUnitName(obj.unit);

  return formattedValue + ' ' + obj.unit + ' (' + fullUnitName + ')';
}

function getFullUnitName(unit) {
  // Map abbreviated units to full names
  const unitNames = {
    'nm': 'nanometers',
    'μm': 'micrometers',
    'cm': 'centimeters',
    'm': 'meters',
    'km': 'kilometers',
    'Mm': 'megameters',
    'Tm': 'terameters',
    'Em': 'exameters'
  };

  return unitNames[unit] || unit;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    // Reposition all controls to match new width
    if (typeof zoomSlider !== 'undefined') {
      zoomSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}

function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(220);
}

// Symmetry corresponding to the number of reflections. Change the number for different number of reflections
let symmetry = 1;

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;

function setup() {
  createCanvas(710, 710);
  angleMode(DEGREES);
  background(32, 32, 32);

  // Creating the save button for the file
  saveButton = createButton("save");
  saveButton.mousePressed(saveFile);

  // Creating the clear screen button
  clearButton = createButton("clear");
  clearButton.mousePressed(clearScreen);

  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createButton("Brush Size");
  sizeSlider = createSlider(1, 32, 10, 0.1);
}

// Save File Function
function saveFile() {
  save("glyph.jpg");
}

// Clear Screen function
function clearScreen() {
  background(32, 32, 32);
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;

    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = sizeSlider.value();
        strokeWeight(sw);

        // Utiliza lerp para suavizar la transición entre puntos
        currentX = lerp(prevX, mx, 0.2);
        currentY = lerp(prevY, my, 0.2);

        stroke(200);

        curve(prevX, prevY, prevX, prevY, currentX, currentY, mx, my);
        push();
        scale(-1, 1);
        curve(prevX, prevY, prevX, prevY, currentX, currentY, mx, my);
        pop();

        prevX = currentX;
        prevY = currentY;
      }
    } else {
      // Restablecer los puntos anteriores cuando no se presiona el ratón
      prevX = mx;
      prevY = my;
    }
  }
}

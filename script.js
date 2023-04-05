const etchASketch = document.querySelector('.etchASketch');
const slider = document.querySelector("#colInput");
const gridToggle = document.querySelector(".gridToggle");
const rainbowMode = document.querySelector(".rainbowMode");
const clearButton = document.querySelector(".clearButton");

let gridShown = false; // start with grid not shown
let currentColNumber = 30; // default
let rainbowModeActive = false;

// draw default grid before user has done anything
drawGrid(currentColNumber);

// need to track mouse depress to see if user is trying to actually draw! Used in listenForClicksOnAnyBox()
let mouseIsDown = false;
addEventListener('mousedown', () => mouseIsDown = true);
addEventListener('mouseup', () => mouseIsDown = false);

// box click event listener inside a function because it needs to be called everytime the grid is redrawn:
function listenForClicksOnAnyBox() {
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach(box => {
        box.addEventListener('mouseover', () => {
            if (mouseIsDown) colourInBox(box);
        })
        box.addEventListener('click', () => colourInBox(box)); // check for a click as well
    });
}

slider.oninput = function() {
    currentColNumber = this.value;
    drawGrid(currentColNumber);
}

gridToggle.addEventListener('click', () => {
    toggleGridLines(gridShown);
    gridShown = !gridShown;
});

rainbowMode.addEventListener('click', () => rainbowModeActive = !rainbowModeActive)

clearButton.addEventListener('click', () => drawGrid(currentColNumber));

function drawGrid(colNumber) {
    removeCurrentBoxes();
    spawnBoxes(colNumber);
    listenForClicksOnAnyBox();
}

function removeCurrentBoxes() {
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach(box => {
        box.remove();
    });
}

function spawnBoxes(colNumber) {
    // note - takes col number so that it is always equal rows and cols, otherwise would need to ask for number of boxes
    // then check it has a square root etc
    const boxNumber = colNumber ** 2; // as many rows as columns
    for (let i = 0; i < boxNumber; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        if (gridShown) box.classList.add('grid');
        etchASketch.appendChild(box);
        // special rules to round the four corners
        if (i === 0) {
            box.setAttribute('id', 'topLeft');
        }
        if (i === colNumber - 1) {
            box.setAttribute('id', 'topRight');
        }
        if (i === boxNumber - colNumber) {
            box.setAttribute('id', 'bottomLeft');
        }
        if (i === boxNumber - 1) {
            box.setAttribute('id', 'bottomRight');
        }
    }
    // Update the css to make sure it wraps on the right number of columns. Note that it's a grid layout:
    etchASketch.style.gridTemplateColumns = `repeat(${colNumber}, 1fr)`;
}

function colourInBox(box) {
    // manipulate the css directly rather than use classes because want a rainbow option
    if (rainbowModeActive) {
        box.style.backgroundColor = generateRandomColour();
    } else {
        box.style.backgroundColor = "black";
    }
}

function generateRandomColour() {
    const red = Math.floor(Math.random() * 256) + 1;
    const green = Math.floor(Math.random() * 256) + 1;
    const blue = Math.floor(Math.random() * 256) + 1;
    return `rgb(${red}, ${green}, ${blue})`
}

function toggleGridLines(gridShown) {
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach(box => {
        if (gridShown) {
            box.classList.remove('grid');
        } else {
            box.classList.add('grid');
        }
    })
}




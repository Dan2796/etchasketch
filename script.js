const etchASketch = document.querySelector('.etchASketch');
const slider = document.querySelector('#colInput');
const gridToggle = document.querySelector('#gridToggle');
const rainbowMode = document.querySelector('#rainbowMode');
const shadingMode = document.querySelector('#shadingMode');
const eraserMode = document.querySelector('#eraserMode');
const clearButton = document.querySelector('.clearButton');

let gridShown = false; // start with grid not shown
let currentColNumber = 30; // default
let rainbowModeActive = false;
let shadingModeActive = false;
let eraserModeActive = false;

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
            if (mouseIsDown) colorInBox(box);
        })
        box.addEventListener('click', () => colorInBox(box)); // check for a click as well
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

// note that rainbow mode unchecks and turns off shading mode, and vice versa:
rainbowMode.addEventListener('click', () => {
    rainbowModeActive = !rainbowModeActive;
    if (rainbowModeActive) {
        shadingModeActive = false;
        shadingMode.checked = false;
    }
})

shadingMode.addEventListener('click', () => {
    shadingModeActive = !shadingModeActive;
    if (shadingModeActive) {
        rainbowModeActive = false;
        rainbowMode.checked = false;
    }
})

eraserMode.addEventListener('click', () => {eraserModeActive = !eraserModeActive;
})

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
        box.style.backgroundColor = 'rgb(255, 255, 255)'; // set here as rgb so it can be retrieved by shading version
        if (gridShown) box.classList.add('grid');
        etchASketch.appendChild(box);
    }
    // Update the css to make sure it wraps on the right number of columns. Note that it's a grid layout:
    etchASketch.style.gridTemplateColumns = `repeat(${colNumber}, 1fr)`;
}

function colorInBox(box) {
    // manipulate the css directly rather than use classes because want a rainbow option
    if (eraserModeActive) {
        box.style.backgroundColor = 'rgb(255, 255, 255)';
    } else if (rainbowModeActive) {
        box.style.backgroundColor = generateRandomColor();
    } else if (shadingModeActive) {
        box.style.backgroundColor = darkenColor(box.style.backgroundColor);
    } else {
        box.style.backgroundColor = 'rgb(0, 0, 0)';
    }
}

function generateRandomColor() {
    const red = Math.floor(Math.random() * 255) + 1;
    const green = Math.floor(Math.random() * 255) + 1;
    const blue = Math.floor(Math.random() * 255) + 1;
    return `rgb(${red}, ${green}, ${blue})`
}

function darkenColor(backgroundColor) {
    const colorVec = backgroundColor.replace(/[^\d,]/g, '').split(',');
    let newRed = colorVec[0] - 30;
    let newGreen = colorVec[1] - 30;
    let newBlue = colorVec[2] - 30;
    return `rgb(${newRed}, ${newGreen}, ${newBlue})`

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

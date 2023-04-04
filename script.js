const etchASketch = document.querySelector('.etchASketch');
const slider = document.querySelector("#colInput");
const gridToggle = document.querySelector(".gridToggle");
let gridShown = false; // start with grid not shown
function spawnBoxes(colNumber) {
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
}

// note - take col number so that it is always equal rows and cols, otherwise would need to ask for number of boxes
// then check it has a square root etc
function drawGrid(colNumber) {

    // remove all existing boxes
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach(box => {
        box.remove();
    });


    spawnBoxes(colNumber);
    // update the css to make sure it wraps on the right number of columns
    etchASketch.style.gridTemplateColumns = `repeat(${colNumber}, 1fr)`;
    listenForClicksOnAnyBox();
}


slider.oninput = function() {
    drawGrid(this.value);
    etchASketch.style.gridTemplateColumns = `repeat(${this.value}, 1fr)`;
}

// remove all existing boxes
function listenForClicksOnAnyBox() {
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach(box => {
        box.addEventListener("mouseover", () => {
            if (mouseIsDown) box.classList.add('clicked');
        })
    });
}

// need to track mouse depress to see if user is trying to actually draw!
let mouseIsDown = false;
addEventListener('mousedown', () => mouseIsDown = true);
addEventListener('mouseup', () => mouseIsDown = false);

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
gridToggle.addEventListener('click', () => {
    toggleGridLines(gridShown);
    gridShown = !gridShown;
});

// default grid draw at middle of scale
drawGrid(30);

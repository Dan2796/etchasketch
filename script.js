const etchASketch = document.querySelector('.etchASketch');

// ask user for col number and work out grid size from that so that it is always square
const colNumber = 10;
// update the css to make sure it wraps on the right number of columns
etchASketch.style.gridTemplateColumns = `repeat(${colNumber}, 1fr)`;

const boxNumber = colNumber ** 2; // as many rows as columns
for (let i = 0; i < boxNumber; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
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


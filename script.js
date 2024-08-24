const gridContainer = document.querySelector(".grid-container");
let drawMode = false;
let eraserMode = false;
let rainbowMode = false;
let colorChoice = "black";



function createGrid(num) {
    gridContainer.style.gridTemplateRows = `repeat(${num}, 1fr)`
    gridContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`

    gridContainer.innerHTML = '';

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add('grid-item');

            gridContainer.appendChild(gridItem);
        }
    }
    console.log("grid-created")
    attachEventListeneres();
}

function attachEventListeneres() {
    const gridItems = document.querySelectorAll(".grid-item")

    gridItems.forEach(item => {

        item.style.opacity = 0.5;

        item.addEventListener('mouseover', () => {
            if (drawMode === true) {
                let initOpacity = parseFloat(item.style.opacity);
                if (initOpacity < 1) {
                    initOpacity += 0.1;
                }
                item.style.opacity = initOpacity;
                item.style.backgroundColor = `${colorChoice}`;
            } else if (eraserMode === true) {
                item.style.backgroundColor = "";
            } else if (rainbowMode === true) {
                item.style.backgroundColor = randColor();
            }
        })

    })

}

createGrid(16);



const buttons = document.querySelectorAll(".buttons button");
const drawButton = document.querySelector("#draw-button");
const chooseColor = document.querySelector("#choose-button");
const eraserButton = document.querySelector("#erase-button");
const rainbowButton = document.querySelector("#rainbow-button")
const clearButton = document.querySelector("#clear-button")
const resetGrid = document.querySelector("#reset-grid-button")



function updateButtonStyle() {
    drawButton.style.backgroundColor = drawMode ? "green" : "";
    eraserButton.style.backgroundColor = eraserMode ? "green" : "";
    rainbowButton.style.backgroundColor = rainbowMode ? "green" : "";
}


function handleButtonClick(mode) {
    if (mode === 'draw') {
        drawMode = !drawMode;
        eraserMode = false;
        rainbowMode = false;
    } else if (mode === 'eraser') {
        eraserMode = !eraserMode;
        drawMode = false;
        rainbowMode = false;
    } else if (mode === 'rainbow') {
        rainbowMode = !rainbowMode;
        drawMode = false;
        eraserMode = false;
    }
    updateButtonStyle();
}

function randNumber() {
    return Math.floor(Math.random() * 101);
}

function randColor() {
    return `hsl(${randNumber()}, ${randNumber()}%, ${randNumber()}%)`;
}

drawButton.addEventListener('click', () => handleButtonClick('draw'));
chooseColor.addEventListener('click', () => {
    let input = prompt("Type color: black(default), red, yellow, blue").toLowerCase();
    if (input === "black" ||
        input === "red" ||
        input === "yellow" ||
        input === "blue"
    ) {
        colorChoice = input;
    }
    console.log(colorChoice);
})
eraserButton.addEventListener('click', () => handleButtonClick('eraser'))
rainbowButton.addEventListener('click', () => handleButtonClick('rainbow'))
clearButton.addEventListener('click', () => {
    const newGridItems = document.querySelectorAll(".grid-item");
    newGridItems.forEach(item => {
        item.style.backgroundColor = "";
        item.style.opacity = 0.5;
    })
    drawMode = false;
    eraserMode = false;
    rainbowMode = false;
    updateButtonStyle();
})




resetGrid.addEventListener('click', () => {
    let size = prompt(`Enter grid size 16-100 (e.g., 16 for 16x16)`)

    if (size >= 16 && size <= 100) {
        createGrid(size);
    } else {
        alert(`Invalid! Input only from 16-100`);
    }
})


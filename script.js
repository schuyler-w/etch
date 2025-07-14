const DEFAULT_SIZE = 16;
var RGB = false;

const body = document.querySelector("body");
const container = document.querySelector("#container");
const btns = document.querySelector("#buttons");

const resize = document.createElement("button");
resize.textContent = "Resize grid";
const reset = document.createElement("button");
reset.textContent = "Reset grid";
const toggleRGB = document.createElement("button");
toggleRGB.textContent = "Toggle RGB Mode";

reset.addEventListener("click", resetGrid);
resize.addEventListener("click", generateNewGrid);
toggleRGB.addEventListener("click", flipRGB);

btns.appendChild(resize);
btns.appendChild(reset);
btns.appendChild(toggleRGB);

function changeCellColor(e) {
    if (!RGB) {
        e.target.style.backgroundColor = "black";
    } else {

        let currentBrightness = e.target.dataset.brightness || 100;
        currentBrightness = parseInt(currentBrightness) - 10;

        if (currentBrightness > 0) {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);

            e.target.style.backgroundColor = `rgb(${r},${g},${b})`;

            e.target.style.filter = `brightness(${currentBrightness}%)`;
            e.target.dataset.brightness = currentBrightness;
        }
    }
}

function generateGridOfSize(num) {
    for (let i = 0; i < num; i++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        for (let j = 0; j < num; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.addEventListener("mouseover", changeCellColor);
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function generateNewGrid() {
    let userInput = parseInt(prompt("What size square grid would you like (4-100)?"));
    if (userInput < 4) {
        userInput = 4;
    }
    if (userInput > 100) {
        userInput = 100;
    }
    deleteGrid();
    generateGridOfSize(userInput);
}

function resetGrid() {
    const listOfCells = document.querySelectorAll(".cell");

    listOfCells.forEach( cell => {
        cell.style.backgroundColor = "lightgrey";
        cell.style.filter = `brightness(100%)`;
        cell.dataset.brightness = 100;
    })
}

function deleteGrid() {
    while (container.firstChild)
        container.removeChild(container.firstChild);
}

function flipRGB(e) {
    RGB = !RGB;
    e.target.classList.toggle("red");
}

generateGridOfSize(DEFAULT_SIZE);
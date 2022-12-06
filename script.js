const container = document.querySelector('.container');
let gridSquares;
let padSize = 440;
let gridSize = 16;
let bombNumber = 10;



newGame();
function newGame(){
    container.innerHTML = '';
    createSquares(gridSize);
    gridSquares = document.querySelectorAll('.square');
    createBombs(bombNumber);
    gridSquares.forEach(element => element.addEventListener('click', squareClicked));
}


function squareClicked(){
    this.innerHTML = this.value;
    console.log(this.value);
}

function createSquares(gridSize){
    let squares;
    let column;
    let row;
    let id = 1;
    const border = 1;
    container.style.width = padSize + 'px'; 
    container.style.height = padSize + 'px'; 

    for (let i = 1; i <= gridSize; i++){
        for (let j = 1; j <= gridSize; j++){
            let square = document.createElement('div');
            square.classList.add('square');
            square.style.width = ((padSize / gridSize) - (2 * border)) + 'px';
            square.style.height = ((padSize / gridSize) - (2 * border)) + 'px';
            square.setAttribute('data-row', i);
            square.setAttribute('data-column', j);
            square.setAttribute('id', id);
            container.appendChild(square);
            console.log(`added square column ${i} row ${j} id ${id}`);
            id++;
        }
    }
    return;
}

function createBombs(number){
    console.log('generating bombs');
    for (let i = 0; i < number; i++){
        let columnIndex = Math.floor(Math.random() * gridSize) + 1; 
        let rowIndex = Math.floor(Math.random() * gridSize) + 1;
        let bombSquare = document.getElementById(((gridSize - 1) * columnIndex) + rowIndex); 
        bombSquare.value = 'b';
        bombSquare.style.backgroundColor = 'pink'
    }
    return;
}
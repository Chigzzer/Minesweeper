const container = document.querySelector('.container');
let gridSquares;
let padSize = 440;
let gridSize = 16;



newGame();
function newGame(){
    container.innerHTML = '';
    createSquares(gridSize);
    gridSquares = document.querySelectorAll('.square');
    gridSquares.forEach(element => element.addEventListener('click', squareClicked));
}


function squareClicked(){
    console.log(this);
}

function createSquares(gridSize){
    let squares;
    let column;
    let row;
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
            container.appendChild(square);
            console.log(`added square column ${i} row ${j}`);
        }
    }
   
    return;
}
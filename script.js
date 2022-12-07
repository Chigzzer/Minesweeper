
container = document.querySelector('.container');
let gridSquares;
let padSize = 440;
let gridSize = 16;
let bombNumber = 40;
let bombLocations = [];
let idStack = [];


newGame();
function newGame(){
    bombLocations = [];
    idStack = [];
    container.innerHTML = '';
    createSquares(gridSize);
    gridSquares = document.querySelectorAll('.square');
    createBombs(bombNumber);
    createNumbers();
    gridSquares.forEach(element => element.addEventListener('click', squareClicked));
    //gridSquares.forEach(element, squareClicked);
}


function squareClicked(){
    getNumber(this.id);
    console.log(this);
    return;
}


function getNumber(id){
    let clickedSquare = document.getElementById(id);
    if (idStack.includes(id)){
        return;
    }
    idStack.push(id);
    if (clickedSquare.value >= 1){
        clickedSquare.innerHTML = clickedSquare.value;
        clickedSquare.style.backgroundColor = 'grey';
        return;
    }
    else if (clickedSquare.value == 'b'){
        clickedSquare.innerHTML = clickedSquare.value;
        clickedSquare.style.backgroundColor = 'black';
        clickedSquare.style.color='red';
        return;
    }
    else{
        clickedSquare.style.backgroundColor='yellow';
        for (let i = (parseInt(clickedSquare.getAttribute('data-row')) - 1); i <= (parseInt(clickedSquare.getAttribute('data-row')) + 1); i++){
            if (i < 1 || i > 16){ continue;}
            for (let j = (parseInt(clickedSquare.getAttribute('data-column')) - 1); j <= (parseInt(clickedSquare.getAttribute('data-column')) + 1); j++){         
                if (j < 1 || j > 16) {continue;}            
                let idCheck = gridSize * (i-1) + j;
                console.log(idCheck);
                if (idCheck == id){continue;}
                
                if (document.getElementById(idCheck) == null){
                    continue;
                }
                else{
                    if (idStack.includes(idCheck) == true){
                        continue;
                    }
                    else{
                        console.log(idCheck);
                        getNumber(idCheck);
                    }
                }
            }
        }
        return;
    }
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
            square.value = '';
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
        let bombSquareIndex = ((gridSize - 1) * columnIndex) + rowIndex; 
        let bombSquare = document.getElementById(bombSquareIndex); 
        bombSquare.value = 'b';
        bombSquare.style.backgroundColor = 'pink';
        bombLocations.push(bombSquareIndex);
    }
    return;
}

function createNumbers(){
    console.log(bombLocations);
    for (let i = 0; i < bombLocations.length; i++){
        let bombLocation = document.getElementById(bombLocations[i]);
        populateNumbers(bombLocation);
    }
    return;
}

function populateNumbers(location){
    console.log('populating');
    row: for (let i = (parseInt(location.getAttribute('data-row')) - 1); i <= (parseInt(location.getAttribute('data-row')) + 1); i++){
        column: for (let j = (parseInt(location.getAttribute('data-column')) - 1); j <= (parseInt(location.getAttribute('data-column')) + 1); j++){         
            if (i < 1 || i > 16){
                continue row;
            }
            if (j < 1 || j > 16){
                continue column;
            }
            
            let idCheck = gridSize * (i-1) + j;
            if (document.getElementById(idCheck) == null){
                continue;
            }
            else if (document.getElementById(idCheck).value == 'b'){
                continue;
            }
            else if (document.getElementById(idCheck).value == ''){
                document.getElementById(idCheck).value = 1;
            }
            else{
                document.getElementById(idCheck).value ++;
            }
        }
    }
}

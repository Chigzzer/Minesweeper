const container = document.querySelector('.container');
let gridSquares;
let padSize = 440;
let gridSize = 16;
let bombNumber = 10;
let bombLocations = [];



newGame();
function newGame(){
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
    /*
    else {
        let indexes;
        console.log(`id: ${clickedSquare.id}`);
        // if clicked square is top left
        if (clickedSquare.id == 1){
            indexes = [1 + 1, 1 + gridSize, 2 + gridSize];
        }
        // if clicked square is top right
        else if (clickedSquare.id == gridSize){
            indexes = [gridSize - 1, gridSize + gridSize, (gridSize - 1) + gridSize];
        }
        // if clicked square is bottom left
        else if (clickedSquare.id == gridSize * (gridSize - 1) + 1){
            let spot = gridSize * (gridSize - 1) + 1;
            indexes = [spot + 1, spot - gridSize, spot - (gridSize + 1)];
        } 
        // if clicked square is bottom right
        else if (clickedSquare.id == gridSize * gridSize){
            let spot = gridSize * gridSize;
            indexes = [spot - 1, spot - gridSize, spot - gridSize - 1];
        }
        // if clicked square is top row
        else if (clickedSquare.getAttribute('data-row') == 1){
            let spot = parseInt(clickedSquare.id);
            indexes = [spot + 1, spot - 1, spot + gridSize - 1, spot + gridSize, spot + gridSize + 1];
        }
        // if clicked square is bottom row
        else if (clickedSquare.getAttribute('data-row') == gridSize){
            let spot = parseInt(clickedSquare.id);
            indexes = [spot + 1, spot - 1, spot - gridSize + 1, spot - gridSize, spot - gridSize - 1];
        }
        // if clicked square is first column
        else if (clickedSquare.getAttribute('data-column') == 1){
            let spot = parseInt(clickedSquare.id);
            indexes = [spot + 1, spot - gridSize, spot + gridSize, spot + gridSize + 1, spot - gridSize + 1 ];
        }
        // if clicked square is last column
        else if (clickedSquare.getAttribute('data-column') == gridSize){
            let spot = parseInt(clickedSquare.id);
            indexes = [spot - 1, spot - gridSize, spot + gridSize, spot + gridSize - 1, spot - gridSize - 1 ];
        }
        // if square in middle 
        else{
            let spot = parseInt(clickedSquare.id);
            console.log(spot);
            indexes = [spot + 1, spot - 1, spot + gridSize, spot - gridSize, spot + gridSize - 1, spot + gridSize + 1, spot - gridSize - 1, spot - gridSize + 1];
        }

        for (let i = 0; i < indexes.length; i++){
            console.log(`indexes: ${indexes}`);
            getNumber(indexes[i]);
        }
    } */
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
    let indexCheck;
    // if bomb is in the top left corner
    if (location.id == 1){
        indexCheck = [1 + 1, 1 + gridSize, 2 + gridSize];
    }

    // Bomb located in top right
    else if (location.id == gridSize){
        indexCheck = [gridSize - 1, gridSize + gridSize, (gridSize - 1) + gridSize];
    }

    // if bomb is bottom left
    else if (location.id == gridSize * (gridSize - 1) + 1){
        let spot = gridSize * (gridSize - 1) + 1;
        indexCheck = [spot + 1, spot - gridSize, spot - gridSize + 1];
    }
    
    // If bomb is bottom right
    else if (location.id == gridSize * gridSize){
        let spot = gridSize * gridSize;
        indexCheck = [spot - 1, spot - gridSize, spot - gridSize - 1];
    }

    // if bomb is in first row
    else if (location.getAttribute('data-row') == 1){
        let spot = parseInt(location.id);
        indexCheck = [spot + 1, spot - 1, spot + gridSize - 1, spot + gridSize, spot + gridSize + 1];
    }

    // if bomb is it the bottom row
    else if (location.getAttribute('data-row') == gridSize){
        let spot = parseInt(location.id);
        indexCheck = [spot + 1, spot - 1, spot - gridSize + 1, spot - gridSize, spot - gridSize - 1];
    }

    // if bomb in first column
    else if (location.getAttribute('data-column') == 1){
        let spot = parseInt(location.id);
         indexCheck = [spot + 1, spot - gridSize, spot + gridSize, spot + gridSize + 1, spot - gridSize + 1 ];
    }

    // if bomb in last column
    else if (location.getAttribute('data-column') == gridSize){
        let spot = parseInt(location.id);
        indexCheck = [spot - 1, spot - gridSize, spot + gridSize, spot + gridSize - 1, spot - gridSize - 1 ];
    }

        // bomb somewhere in center
    else {
        let spot = parseInt(location.id);
        console.log(spot);
        indexCheck = [spot + 1, spot - 1, spot + gridSize, spot - gridSize, spot + gridSize - 1, spot + gridSize + 1, spot - gridSize - 1, spot - gridSize + 1];
        console.log(indexCheck);
    }

    for (let i = 0; i < indexCheck.length; i++){
        if (document.getElementById(indexCheck[i]).value == 'b'){
            continue;
        }
        else if (isNaN(document.getElementById(indexCheck[i]).value)){
            document.getElementById(indexCheck[i]).value = 1;
        }
        else{
            document.getElementById(indexCheck[i]).value++;
        }
    }
    return;
}
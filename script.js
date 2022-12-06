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
    this.innerHTML = this.value;
    this.style.backgroundColor = 'grey';
    console.log(this);
    return;
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
    
    // if bomb is in the top left corner
    if (location.id == 1){
        let indexCheck = [1 + 1, 1 + gridSize, 2 + gridSize];
        for (let i = 0; i < indexCheck.length; i++){
            console.log(document.getElementById(indexCheck[i]));
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
    }

    // Bomb located in top right
    else if (location.id == gridSize){
        let indexCheck = [gridSize - 1, gridSize + gridSize, (gridSize - 1) + gridSize];
        for (let i = 0; i < indexCheck.length; i++){
            console.log(document.getElementById(indexCheck[i]));
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
    }

    // if bomb is bottom left
    else if (location.id == gridSize * (gridSize - 1) + 1){
        let spot = gridSize * (gridSize - 1) + 1;
        let indexCheck = [spot + 1, spot - gridSize, spot - 15];
        for (let i = 0; i < indexCheck.length; i++){
            console.log(document.getElementById(indexCheck[i]));
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
    }
    
    // If bomb is bottom right
    else if (location.id == gridSize * gridSize){
        let spot = gridSize * gridSize;
        let indexCheck = [spot - 1, spot - gridSize, spot - 17];
        for (let i = 0; i < indexCheck.length; i++){
            console.log(document.getElementById(indexCheck[i]));
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
    }

    // if bomb is in first row
    else if (location.getAttribute('data-row') == 1){
        let spot = parseInt(location.id)
        let indexCheck = [spot + 1, spot - 1, spot + 15, spot + 16, spot + 17];
        for (let i = 0; i < indexCheck.length; i++){
            console.log(document.getElementById(indexCheck[i]));
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
    }

    // if bomb is it the bottom row
    else if (location.getAttribute('data-row') == gridSize){
        let spot = parseInt(location.id)
        let indexCheck = [spot + 1, spot - 1, spot - gridSize + 1, spot - gridSize, spot - gridSize - 1];
        for (let i = 0; i < indexCheck.length; i++){
            console.log(document.getElementById(indexCheck[i]));
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
    }

    // if bomb in first column
    else if (location.getAttribute('data-column') == 1){
        let spot = parseInt(location.id)
        let indexCheck = [spot + 1, spot - gridSize, spot + gridSize, spot + gridSize + 1, spot - gridSize + 1 ];
        for (let i = 0; i < indexCheck.length; i++){
            console.log(document.getElementById(indexCheck[i]));
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
    }

    // if bomb in last column
    else if (location.getAttribute('data-column') == gridSize){
        let spot = parseInt(location.id)
        let indexCheck = [spot - 1, spot - gridSize, spot + gridSize, spot + gridSize - 1, spot - gridSize - 1 ];
        for (let i = 0; i < indexCheck.length; i++){
            console.log(document.getElementById(indexCheck[i]));
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
    }

        // bomb somewhere in center
        else {
            let spot = parseInt(location.id);
            console.log(spot);
            let indexCheck = [spot + 1, spot - 1, spot + gridSize, spot - gridSize, spot + gridSize - 1, spot + gridSize + 1, spot - gridSize - 1, spot - gridSize + 1];
            console.log(indexCheck);
            for (let i = 0; i < indexCheck.length; i++){
                console.log(document.getElementById(i));
                console.log(document.getElementById(indexCheck[i]));
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
        }
        return;
        
    //}
}
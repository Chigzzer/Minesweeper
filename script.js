const container = document.querySelector('.container');
let gridSquares;
let padSize = 440;
let gridSize = 16;
let bombNumber = 10;
let bombLocations = [];
let idStack = [];


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
    else{
        for (let i = (parseInt(clickedSquare.getAttribute('data-row')) - 1); i <= (parseInt(clickedSquare.getAttribute('data-row')) + 1); i++){
            for (let j = (parseInt(clickedSquare.getAttribute('data-column')) - 1); j <= (parseInt(clickedSquare.getAttribute('data-column')) + 1); j++){         
                let idCheck = gridSize * (i-1) + j;
                console.log(idCheck);
                
                if (document.getElementById(idCheck) == null){
                    continue;
                }
                else{
                    if (idStack.includes(idCheck) == true){
                        continue;
                    }
                    else{
                        console.log(idCheck);
                        idStack.push(idCheck);
                        getNumber(idCheck);
                        return;
                    }
                }
            }
        }
    }
}


function getNumber1(id){
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
    console.log('populating');
    for (let i = (parseInt(location.getAttribute('data-row')) - 1); i <= (parseInt(location.getAttribute('data-row')) + 1); i++){
        for (let j = (parseInt(location.getAttribute('data-column')) - 1); j <= (parseInt(location.getAttribute('data-column')) + 1); j++){         
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

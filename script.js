// Setting 
const container = document.querySelector('.container');
const containerBox = document.querySelector('.containerBox');
const autoFill = document.querySelector('#autoFill');
const bombCount = document.querySelector('#bombCount');
const difficultyLevels = document.querySelectorAll('.difficultyButtons');
const newGameButton = document.querySelector('#levelSubmit');
const curtain = document.querySelector('.curtain');

// Setting initial 
let gridSquares;
let padSize = 440;
let gridSize = 16;
let bombNumber = 51;
let flagCount = 0;
let bombLocations = [];
let idStack = [];

//Adding initial event listeners
difficultyLevels.forEach(element => element.addEventListener('click', setLevel));
newGameButton.addEventListener('click', newGame);

container.style.width = padSize + 'px'; 
containerBox.style.width = padSize + 'px'; 
container.style.height = padSize + 'px';
containerBox.style.height = padSize + 'px';

// Set difficulty of the game
function setLevel(){
    difficultyLevels.forEach(element => element.classList.remove('clicked'));
    
    if (this.value == "0"){
        bombNumber = Math.floor((gridSize * gridSize) * 0.1);
        console.log ("Setting level to easy");
        this.classList.add('clicked');
    }
    else if (this.value == "1"){
        bombNumber = Math.floor((gridSize * gridSize) * 0.2);
        console.log ("Setting level to medium");
        this.classList.add('clicked');
    }
    else if (this.value == "2"){
        bombNumber = Math.floor((gridSize * gridSize) * 0.3);
        console.log ("Setting level to Hard");
        this.classList.add('clicked');
    }
}

// To start a new game
function newGame(){
    console.log("New game initiated");
    console.log('Starting a new game');
    // Initializing values again.
    bombLocations = [];
    idStack = [];
    flagCount = 0;
    container.innerHTML = '';
    curtain.classList.add('hidden');
    createSquares(gridSize);
    gridSquares = document.querySelectorAll('.square');
    bombCount.innerText=`Bomb Count: ${bombNumber}`;
    createBombs(bombNumber);
    createNumbers();
    gridSquares.forEach(element => element.addEventListener('click', eventClicked));
    autoFill.addEventListener('click', autoFillSquares);
    document.querySelector(".flagCountText").innerText = `Flags remaining: ${bombNumber - flagCount}`;
    return;
}

// Function to auto fill in the squares once all flags have been placed. 
function autoFillSquares(){
    console.log('Auto filling squares');
    for (let i = 1; i <= (gridSize*gridSize); i++){
      if (flagCount != bombNumber) return;
      let tempSquare = document.getElementById(i);
      if (tempSquare.getAttribute('data-flagged') == 'true'){
        continue;
      }
      if (tempSquare.getAttribute('data-bomb') == 'true'){
        tempSquare.style.backgroundColor = 'black';
        tempSquare.innerHTML = "<img src='bomb.png' alt='bomb icon' />";
        gameOver('lose');
        return;
      }
      else{
        tempSquare.style.backgroundColor = 'yellow';
      }
    }
    gameOver('win');
    return;
}

// Function for every click on a grid square
function eventClicked(e){
    console.log("Square clicked");
    console.log(e.target);
    console.log("above");   
    if (e.button == 0 && e.ctrlKey){
        flagSelected(e.target)
    }
    else if( e.button == 0){
        //console.log(e);
        squareClicked(e.target);
    }
    return
}

// Function to flag and un-flag square 
function flagSelected(event){
    console.log(event.getAttribute('data-clicked'));
    let flagSquare = document.getElementById(event.id);
    if (flagSquare == null){
        return;
    }
    else if (flagSquare.getAttribute('data-clicked') == 'true'){
        return;
    }
    else if (flagSquare.getAttribute('data-flagged') == 'true'){
        flagSquare.removeChild(flagSquare.lastChild);
        flagCount--;
        flagSquare.setAttribute('data-flagged', 'false');
        flagSquare.classList.remove('flagged');
    }
    else{
        if (flagCount == bombNumber) return;
        flagSquare.setAttribute('data-flagged', 'true');
        flagCount++;
        flagSquare.innerHTML = `<img id=${event.id} src='flag.png' alt='flag icon' />`;
        flagSquare.classList.add('flagged');
    }
    document.querySelector(".flagCountText").innerText = `Flags remaining: ${bombNumber - flagCount}`;
    return;
}

// Function when a square is clicked.
function squareClicked(event){
    if (event.getAttribute('data-clicked') == 'true'){
        return;
    }

    if (event.getAttribute('data-flagged') == 'true'){
        return;
    }
    else{
        if (idStack.includes(event.id)){
            return;
        }
        else{
            getNumber(event.id);
        }
        return
    }
}

// Function that runs at the end of every game
function gameOver(argument){
    curtain.innerHTML = '';
    curtain.classList.remove('hidden');
    //curtain.setAttribute("style", "display:felx");
    for ( let i = 1; i <= (gridSize * gridSize); i++){
        let tempSquare = document.getElementById(i);
        if (tempSquare.getAttribute('data-bomb') == 'true'){
            tempSquare.style.backgroundColor = 'black';
            tempSquare.innerHTML = "<img src='bomb.png' alt='bomb icon' />";
          }
          else{
            tempSquare.style.backgroundColor = 'yellow';
            tempSquare.innerText = tempSquare.value;
          }
    }
    if (argument == 'lose'){
        console.log('Game over you lost');
        curtain.innerHTML = "<p> You Lost :( </p>";
        gridSquares.forEach(element => element.removeEventListener('click', eventClicked));
        return; 
    }
    else{
        console.log('win');
        curtain.innerHTML = "<p> You Won </p>";
        gridSquares.forEach(element => element.removeEventListener('click', eventClicked));
        return;
    }
}

// Check number of selected square or whether it is a bomb.
function getNumber(id){
    let clickedSquare = document.getElementById(id);
    let idInt =parseInt(id);
    clickedSquare.setAttribute('data-clicked', 'true');
    console.log(idStack);
    console.log(idStack.includes(idInt));
    if (idStack.includes(idInt)){
        return;
    }
    idStack.push(idInt);
    if (clickedSquare.getAttribute('data-flagged') == 'true'){
        return;
    }
    else if (clickedSquare.value >= 1){
        clickedSquare.innerHTML = clickedSquare.value;
        clickedSquare.style.backgroundColor = 'grey';
    }
    else if (clickedSquare.getAttribute('data-bomb') == 'true'){
        clickedSquare.innerHTML = clickedSquare.value;
        clickedSquare.style.backgroundColor = 'black';
        clickedSquare.style.color='red';
        clickedSquare.innerHTML = "<img src='bomb.png' alt='bomb icon' />";
        gameOver('lose');
        return;
    }
    else spreadBlank(clickedSquare, id);
    if (idStack.length + bombNumber == gridSize * gridSize) {
        gameOver('win');
    }
    return;
}

// Function to spread if a blank square is clicked
function spreadBlank(square, id){
    square.style.backgroundColor='yellow';
    for (let i = (parseInt(square.getAttribute('data-row')) - 1); i <= (parseInt(square.getAttribute('data-row')) + 1); i++){
        if (i < 1 || i > 16) continue;
        for (let j = (parseInt(square.getAttribute('data-column')) - 1); j <= (parseInt(square.getAttribute('data-column')) + 1); j++){         
            if (j < 1 || j > 16) continue;            
            let idCheck = gridSize * (i-1) + j;
            if (idCheck == id) continue;
            if (document.getElementById(idCheck) == null) continue;
            else{
                if (idStack.includes(idCheck) == true ) continue;
                else getNumber(idCheck);
            }
        }
    }
    return;
}

// Functions to create the grid.
function createSquares(gridSize){
    let squares;
    let column;
    let row;
    let id = 1;
    const border = 1;
    container.style.width = padSize + 'px'; 
    container.style.height = padSize + 'px'; 
    container.innerHTML='';
    console.log('Creating squares');
    for (let i = 1; i <= gridSize; i++){
        let row = document.createElement('div');
        for (let j = 1; j <= gridSize; j++){
            let square = document.createElement('div');
            square.classList.add('square');
            square.style.width = ((padSize / gridSize) - (2 * border)) + 'px';
            square.style.height = ((padSize / gridSize) - (2 * border)) + 'px';
            square.setAttribute('data-row', i);
            square.setAttribute('data-column', j);
            square.setAttribute('id', id);
            square.setAttribute('data-clicked', 'false');
            square.setAttribute('data-flagged', 'false');
            square.value = '';
            row.appendChild(square);
            console.log(`added square column ${i} row ${j} id ${id}`);
            id++;
        }
        container.appendChild(row);
    }
    return;
}

function createBombs(number){
    console.log('Generating bombs');
    let i = 0;
    while (i < number){
        let columnIndex = Math.floor(Math.random() * gridSize) + 1; 
        let rowIndex = Math.floor(Math.random() * gridSize) + 1;
        let bombSquareIndex = (gridSize * (rowIndex - 1) + columnIndex);
        if (bombLocations.includes(bombSquareIndex)) continue;
        let bombSquare = document.getElementById(bombSquareIndex);
        bombSquare.setAttribute('data-bomb', 'true');
        bombLocations.push(bombSquareIndex);
        i++
    }
    return;
}

// FUnction that generates the numbers around the bomb
function createNumbers(){
    console.log("Generating numbers around bombs");
    for (let i = 0; i < bombLocations.length; i++){
        let bombLocation = document.getElementById(bombLocations[i]);
        populateNumbers(bombLocation);
    }
    return;
}

// Generates numbers around bomb location
function populateNumbers(location){
    console.log(`populating location ${location.id}`);
    row: for (let i = (parseInt(location.getAttribute('data-row')) - 1); i <= (parseInt(location.getAttribute('data-row')) + 1); i++){
        column: for (let j = (parseInt(location.getAttribute('data-column')) - 1); j <= (parseInt(location.getAttribute('data-column')) + 1); j++){         
            if (i < 1 || i > 16) continue row;
            if (j < 1 || j > 16) continue column;            
            let idCheck = gridSize * (i-1) + j;
            if (document.getElementById(idCheck) == null) continue;
            else if (document.getElementById(idCheck).getAttribute('data-bomb') == 'true') continue;
            else if (document.getElementById(idCheck).value == '') document.getElementById(idCheck).value = 1;
            else{
                document.getElementById(idCheck).value ++;
            }
        }
    }
    return;
}

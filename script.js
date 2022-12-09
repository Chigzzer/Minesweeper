
const container = document.querySelector('.container');
const autoFill = document.querySelector('#autoFill');
const bombCount = document.querySelector('#bombCount');
const difficultyLevels = document.querySelectorAll('.difficultyButtons');
const newGameButton = document.querySelector('#levelSubmit');
const curtain = document.querySelector('.curtain');

let gridSquares;
let level = 1;
let padSize = 440;
let gridSize = 16;
let bombNumber = 0;
let bombLocations = [];
let idStack = [];
let gameFinished = false;

difficultyLevels.forEach(element => element.addEventListener('click', setLevel));
newGameButton.addEventListener('click', newGame);
container.style.width = padSize + 'px'; 
container.style.height = padSize + 'px';


function setLevel(){
    difficultyLevels.forEach(element => element.classList.remove('clicked'));
    this.classList.add('clicked');
    level = this.value;
    if (level == "0"){
        bombNumber = Math.floor((gridSize * gridSize) * 0.1);
    }
    else if (level == "1"){
        bombNumber = Math.floor((gridSize * gridSize) * 0.2);
    }
    else if (level == "2"){
        bombNumber = Math.floor((gridSize * gridSize) * 0.3);
    }
    else{
        bombNumber == 1;
    }

    console.log(this.value);
}
function newGame(){
    console.log("New game initiated");
    console.log('starting game');
    bombLocations = [];
    idStack = [];
    if (bombNumber == 0){
        bombNumber = Math.floor(Math.random() * (gridSize * gridSize));
    }
    container.innerHTML = '';
    createSquares(gridSize);
    gridSquares = document.querySelectorAll('.square');
    bombCount.innerText=`Bomb Count: ${bombNumber}`;
    createBombs(bombNumber);
    createNumbers();
    console.log(gridSquares);
    gridSquares.forEach(element => element.addEventListener('click', eventClicked));
    autoFill.addEventListener('click', autoFillSquares);
    return;
}

function autoFillSquares(){
    console.log('Auto filling squares');
    for (let i = 1; i <= (gridSize*gridSize); i++){
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




function eventClicked(e){

    console.log(e);
    if (e.button == 0 && e.ctrlKey){
        console.log("HERE");
        console.log(e.explicitOriginalTarget.parentNode);
        if (e.explicitOriginalTarget.parentNode.getAttribute('data-flagged') == 'true'){
            flagSelected(e.explicitOriginalTarget.parentNode);
        }
        else{
            flagSelected(e.explicitOriginalTarget);
        }
    }
    else if( e.button == 0){
        console.log(e);
        squareClicked(e.explicitOriginalTarget);
    }
    console.log(gameFinished);
    if (gameFinished == true){
        return;
    }
    return
}

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
        flagSquare.setAttribute('data-flagged', 'false');
    }
    else{
        flagSquare.setAttribute('data-flagged', 'true');
        flagSquare.innerHTML = `<img id=${event.id} src='flag.png' alt='flag icon' />`;
    }
    return;
}

function squareClicked(event){
    console.log("HERE");
    console.log(event);
    if (event.getAttribute('data-clicked') == 'true'){
        return;
    }

    if (event.getAttribute('data-flagged') == 'true'){
        return;
    }
    else{
        if( event.id == ""){
            console.log("HERE2");
            console.log(event.parentNode.id);
            getNumber(event.parentNode.id)
            return
        }
        if (idStack.includes(event.id)){
            return;
        }
        else{
            getNumber(event.id);
        }
        return
    }
}

function gameOver(argument){
    curtain.classList.remove('hidden');
    if (argument == 'lose'){
        console.log('Game over you lost');
        gameFinished = true;
        gridSquares.forEach(element => element.removeEventListener('click', eventClicked));
        return; 
    }
    else{
        console.log('win');
        gameFinished = true;
        gridSquares.forEach(element => element.removeEventListener('click', eventClicked));
        return;
    }
}

function getNumber(id){
    let clickedSquare = document.getElementById(id);
    let idInt =parseInt(id);
    clickedSquare.setAttribute('data-clicked', 'true');
    console.log(idStack);
    console.log(idStack.includes(idInt));
    if (idStack.includes(idInt)){
        return;
    }
    else{
        idStack.push(idInt);
    }
    if (clickedSquare.value >= 1){
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
    else if (clickedSquare.getAttribute('data-flagged') == 'true'){
        return;
    
    }
    else{
        clickedSquare.style.backgroundColor='yellow';
        for (let i = (parseInt(clickedSquare.getAttribute('data-row')) - 1); i <= (parseInt(clickedSquare.getAttribute('data-row')) + 1); i++){
            if (i < 1 || i > 16){ continue;}
            for (let j = (parseInt(clickedSquare.getAttribute('data-column')) - 1); j <= (parseInt(clickedSquare.getAttribute('data-column')) + 1); j++){         
                if (j < 1 || j > 16) {continue;}            
                let idCheck = gridSize * (i-1) + j;
                if (idCheck == id){continue;}
                if (document.getElementById(idCheck) == null){
                    continue;
                }
                else{
                    if (idStack.includes(idCheck) == true ){
                        continue;
                    }
                    else{
                        getNumber(idCheck);
                    }
                }
            }
        }
        

    }
     console.log(`stack: ${idStack}`);
    if (idStack.length + bombNumber == gridSize * gridSize){
        gameOver('win');
    }
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
    container.innerHTML='';
    console.log('Creating squares');
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
    console.log('Generating bombs');
    let i = 0;
    while (i < number){
        let columnIndex = Math.floor(Math.random() * gridSize) + 1; 
        let rowIndex = Math.floor(Math.random() * gridSize) + 1;
        let bombSquareIndex = (gridSize * (rowIndex - 1) + columnIndex);
        if (bombLocations.includes(bombSquareIndex)){
            continue;
        }
        let bombSquare = document.getElementById(bombSquareIndex);
        bombSquare.setAttribute('data-bomb', 'true');
        bombSquare.style.backgroundColor = 'pink';
        bombLocations.push(bombSquareIndex);
        i++
    }
    return;
}

function createNumbers(){
    console.log("Generating numbers around bombs");
    for (let i = 0; i < bombLocations.length; i++){
        let bombLocation = document.getElementById(bombLocations[i]);
        populateNumbers(bombLocation);
    }
    return;
}

function populateNumbers(location){
    // console.log(`populating location ${location.id}`);
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
            else if (document.getElementById(idCheck).getAttribute('data-bomb') == 'true'){
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
    return;
}

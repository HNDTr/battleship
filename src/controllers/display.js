import { randomShipsPlacement, hitShip, newGameReset } from "./game";
import { Player } from "../models/player";

function boardDisplay(name, playerBoard, computerBoard) {
    const board = document.querySelector(`.${name}-board`);
    board.innerHTML = ''
    for(let r=0; r < 10; r++){ 
        for(let c=0;  c < 10; c++){ 
            const gridBox = document.createElement('div');
            gridBox.className = 'grid-box';
            gridBox.dataset.row = r;  // data-row
            gridBox.dataset.col = c;  // data-col
            gridBox.id = `${name}-box-${r}-${c}`; // unique ID like "player-box-0-0"
            if(name === 'computer'){
                hitShip(gridBox, playerBoard, computerBoard);
            } 
            board.appendChild(gridBox);
        }
    }
}




function displayShipsOnBoard(player, boardName) {
    player.gameBoard.ships.forEach(({ coordinates }) => {
        coordinates.forEach(coord => {
            const cell = document.querySelector(`#${boardName}-box-${coord.y}-${coord.x}`);
            cell.classList.add('ship'); // add a class to mark ship positions
        });
    });
}

function randomDisplayButton(human, computer){
    const randomDisplayBtn = document.querySelector('.rand-display-btn');
    randomDisplayBtn.addEventListener('click', () => {
        // Reset boards visually
        boardDisplay('player', human.gameBoard, computer.gameBoard)
        boardDisplay('computer', human.gameBoard, computer.gameBoard)

        document.querySelectorAll('.grid-box').forEach(box => {
            box.classList.remove('ship');
        });

        newGameReset(human, computer)
        randomShipsPlacement(human)
        randomShipsPlacement(computer)
        
        // Display ships on boards
        displayShipsOnBoard(human, 'player');

        displayTurn('Your turn!')
    })
}

function displayAIAttacks(humanGameBoard){
    //display missed
    humanGameBoard.missedAttacks.forEach((coord) => {
        let x = coord.x;
        let y = coord.y;

        const grid = document.querySelector(`#player-box-${y}-${x}`)
        grid.style.backgroundColor = 'black';
    })

    //display hit
    humanGameBoard.hitAttacks.forEach((coord) => {
        let x = coord.x;
        let y = coord.y;

        const grid = document.querySelector(`#player-box-${y}-${x}`)
        grid.style.backgroundColor = 'red';
    })
}

function displayWinner(winner){
    const winnerWindow = document.querySelector('.grey-background');
    const gameOver = document.querySelector('.game-over-container');
    const playAgainBtn = document.querySelector('.play-again-btn');
    const winnerText = document.querySelector('.winner-text');
    // show the window
    winnerWindow.classList.remove('hide');
    gameOver.classList.remove('hide');
    // display whether win or lose
    if(winner === 'player'){
        winnerText.textContent = 'You win!';
    } else {
        winnerText.textContent = 'You lose!';
    }

    const human = new Player();
    const computer = new Player();
    // play again button
    playAgainBtn.addEventListener('click', () => {
        randomShipsPlacement(human, computer)
        winnerWindow.classList.add('hide');
        gameOver.classList.add('hide');
    })
}

function displayGameStart(human, computer){
    const randomDisplayBtn = document.querySelector('.rand-display-btn');
    const window = document.querySelector('.grey-background');
    const gameStart = document.querySelector('.game-start-container');
    const playGameBtn = document.querySelector('.play-game-btn');

    window.classList.remove('hide');

    playGameBtn.addEventListener('click', () => {
        randomDisplayButton(human, computer)
        gameStart.classList.add('hide')
        window.classList.add('hide');
        randomDisplayBtn.click();
    })

}

function displayTurn(text){
    const turnText = document.querySelector('.turn-display');

    turnText.textContent = `${text}`
}


export {boardDisplay, randomDisplayButton, displayAIAttacks, displayWinner, displayGameStart, displayTurn}
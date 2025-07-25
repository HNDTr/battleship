import { randomShipsPlacement, hitShip } from "./game";

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

        human.gameBoard.resetShips();
        computer.gameBoard.resetShips();
        randomShipsPlacement(human)
        randomShipsPlacement(computer)
        
        // console.log(human.gameBoard.ships)
        // console.log(computer.gameBoard.ships)

        // Display ships on boards
        displayShipsOnBoard(human, 'player');
        displayShipsOnBoard(computer, 'computer');
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

function displayWinner(){

}


export {boardDisplay, randomDisplayButton, displayAIAttacks}
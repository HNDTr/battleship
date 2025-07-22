
import { randomShipsPlacement } from "./game";

function boardDisplay(name) {
    const board = document.querySelector(`.${name}-board`);
    for(let r=0; r < 10; r++){ // rows
        for(let c=0; c <10; c++){ // columns
            const gridBox = document.createElement('div');
            gridBox.className = 'grid-box';
            gridBox.dataset.row = r;  // data-row
            gridBox.dataset.col = c;  // data-col
            gridBox.id = `${name}-box-${r}-${c}`; // unique ID like "player-box-0-0"
            board.appendChild(gridBox);
        }
    }
}

function playersBoardDisplay(){
    boardDisplay('player');
    boardDisplay('computer');
}

function displayShipsOnBoard(player, boardName) {
    player.gameBoard.ships.forEach(({ coordinates }) => {
        coordinates.forEach(coord => {
            const cell = document.querySelector(`#${boardName}-box-${coord.y}-${coord.x}`);
            cell.classList.add('ship'); // add a class to mark ship positions
        });
    });
}

function randomDisplayButton(player1, player2){
    const randomDisplayBtn = document.querySelector('.rand-display-btn');
    randomDisplayBtn.addEventListener('click', () => {
        // Reset boards visually
        document.querySelectorAll('.grid-box').forEach(box => {
            box.classList.remove('ship');
        });

        player1.gameBoard.resetShips();
        player2.gameBoard.resetShips();
        randomShipsPlacement(player1)
        randomShipsPlacement(player2)
        // console.log(player1.gameBoard.ships)
        // console.log(player2.gameBoard.ships)

        // Display ships on boards
        displayShipsOnBoard(player1, 'player');
        displayShipsOnBoard(player2, 'computer');
    })


}


export {boardDisplay, playersBoardDisplay, randomDisplayButton}
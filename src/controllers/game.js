import { Ship } from "../models/ship";
import { displayAIAttacks, displayWinner, displayTurn } from "./display";

let recentHit; // queue; 
let stacks = []; // aiPotentialAttacks 

// let turn = 'Player';

function randomShipsPlacement(player){
    let shipsLength = [5, 4, 3, 3, 2]
    while (shipsLength.length > 0) {
        let shipLength = shipsLength.pop() // Carrier, Battleship, Cruiser, Submarine, Destroyer
        let xCoord = Math.floor((Math.random() * 10)); // 0 - 9
        let yCoord = Math.floor((Math.random() * 10)); 

        const ship = new Ship(shipLength);
        try {
            player.gameBoard.placeShip(ship, xCoord, yCoord, trueOrFalse);
        } catch (error) {
            // Do NOT decrement totalShips, so we retry
            shipsLength.push(shipLength);
        }
    }
}

function trueOrFalse(){
    let randNum = Math.floor(Math.random() * 2); // 0 or 1
    if (randNum === 0){
        return true
    } else {
        return false
    }
}

function hitShip(grid, humanBoard, computerBoard){
    grid.addEventListener('click', () => {
        // TO-DO 
        let xcoord = +grid.dataset.row;
        let ycoord = +grid.dataset.col;

        let hitOrMiss = computerBoard.receiveAttack(ycoord, xcoord);

        document.querySelector('.computer-board').style.pointerEvents = 'none';

        if (hitOrMiss === 'hit!'){
            grid.style.backgroundColor = 'red'
            // aiAttack(humanBoard)
            if(computerBoard.allShipsSunked()){
                // display winning and button for restart
                displayWinner('player');
            }
        } else if (hitOrMiss === 'missed!') {
            grid.style.backgroundColor = 'black'
            // aiAttack(humanBoard)
        } else {
            document.querySelector('.computer-board').style.pointerEvents = 'auto';
            return 
        }

        displayTurn('Waiting for their turn....')

        setTimeout(() => {
            aiAttack(humanBoard);

            if (computerBoard.allShipsSunked()) {
                displayWinner('player');
            }

            // Re-enable player clicks after AI finishes
            document.querySelector('.computer-board').style.pointerEvents = 'auto';
        }, 1000); // 500ms delay for AI "thinking"
    })
}

function aiAttack(gameBoard){
    let attacking = true;
    let neighbors = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0]
    ];

    while (attacking){
        // check if recent attacks 
        if (recentHit){
            if (stacks.length > 0){
                let [x, y] = stacks.pop();
                let hitOrMiss = gameBoard.receiveAttack(x, y);
                if (hitOrMiss === 'hit!'){
                    let directionHit = [x - recentHit[0], y - recentHit[1]];
                    let nextX = x + directionHit[0];
                    let nextY = y + directionHit[1];

                    if (nextX >= 0 && nextY >= 0 && nextX <= 9 && nextY <= 9) {
                        stacks.push([nextX, nextY]);  // prioritize this next
                    }
                    recentHit = [x, y];

                    if(gameBoard.allShipsSunked()){
                        displayWinner('computer')
                    }
                    attacking = false;
                } else if (hitOrMiss === 'missed!') {
                    attacking = false;
                } 
            } else { // update recent hit since no longer have stacks
                recentHit = null;
            }
        } else {
            let x = Math.floor((Math.random() * 10)); // 0 - 9
            let y = Math.floor((Math.random() * 10)); 
            let hitOrMiss = gameBoard.receiveAttack(x, y);
            
            if (hitOrMiss === 'hit!'){
                recentHit = [x, y]
                for (let [dx, dy] of neighbors){
                    let newX = x + dx;
                    let newY = y + dy;
                    if(newX >= 0 && newY >= 0 && newX <= 9 && newY <= 9){
                        stacks.push([newX, newY])
                    }
                }
                if(gameBoard.allShipsSunked()){
                    displayWinner('computer')
                }
                attacking = false;
            } else if (hitOrMiss === 'missed!') {
                attacking = false;
            } 
        }
    }
    displayTurn('Your turn!')
    displayAIAttacks(gameBoard)
}

function newGameReset(human, computer){
    // reset everything
    human.gameBoard.reset();
    computer.gameBoard.reset(); 
    recentHit; 
    stacks = []; //aiPotentialAttacks
}




export {randomShipsPlacement, hitShip, newGameReset}
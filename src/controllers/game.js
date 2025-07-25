import { Ship } from "../models/ship";
import { displayAIAttacks } from "./display";


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
            // console.log("Failed to place ship:", error.message);
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
        console.log(`x: ${xcoord}`)
        console.log(`y: ${ycoord}`)
        // x, y = getting from the grid 

        // gameBoard.receiveAttack(x, y)
        let hitOrMiss = computerBoard.receiveAttack(ycoord, xcoord);

        // console.log(hitOrMiss)

        if (hitOrMiss === 'hit!'){
            grid.style.backgroundColor = 'red'
            aiAttack(humanBoard)
            if(computerBoard.allShipsSunked()){
                // display winning and button for restart
                console.log('win!')
            }
        } else if (hitOrMiss === 'missed!') {
            grid.style.backgroundColor = 'black'
            aiAttack(humanBoard)
        } else {
            return 
        }
        // changed Turn 
    })
}

function aiAttack(gameBoard){
    let alreadyAttack = true;

    while (alreadyAttack){
        let x = Math.floor((Math.random() * 10)); // 0 - 9
        let y = Math.floor((Math.random() * 10)); 
        let hitOrMiss = gameBoard.receiveAttack(x, y);

        if (hitOrMiss === 'hit!'){
            // grid.style.backgroundColor = 'red'
            displayAIAttacks(gameBoard)
            console.log(`ai hit ${x}, ${y}`)
            if(gameBoard.allShipsSunked()){
                // display winning and button for restart
                console.log('win!')
            }
            // change turn 
            alreadyAttack = false;
        } else if (hitOrMiss === 'missed!') {
            // grid.style.backgroundColor = 'black'
            // change turn 
            displayAIAttacks(gameBoard)
            console.log(`ai missed ${x}, ${y}`)
            alreadyAttack = false;
        } 
    }
}




export {randomShipsPlacement, hitShip}
import { Ship } from "../models/ship";

function randomShipsPlacement(player){
    let totalShips = 5;

    while (totalShips > 0) {
        let shipLength = Math.floor((Math.random() * 4)) + 2; // 1, 2, or 3
        let xCoord = Math.floor((Math.random() * 10)); // 0 - 9
        let yCoord = Math.floor((Math.random() * 10)); 

        const ship = new Ship(shipLength);
        try {
            player.gameBoard.placeShip(ship, xCoord, yCoord, trueOrFalse);
            totalShips--; // Only decrement if placement succeeds
        } catch (error) {
            // console.log("Failed to place ship:", error.message);
            // Do NOT decrement totalShips, so we retry
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


export {randomShipsPlacement}
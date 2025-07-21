import { Gameboard } from "../models/gameboard";
import { Ship } from "../models/ship";


describe('Gameboard class', () => { 
    let ship1;
    let ship2;
    let board;

    // So we don't reuse the same board each test
    beforeEach(() => {
        board = new Gameboard();
        ship1 = new Ship(2);
        ship2 = new Ship(3);
        board.placeShip(ship1, 3, 3); // place ship1 horizontally at (3,3)
        board.placeShip(ship2, 5, 5); // place ship2 horizontally at (5,5)
    });


    test('Missed attacks', () => { 
        board.receiveAttack(1,1)
        board.receiveAttack(3,2)
        expect(board.missedAttacks).toContainEqual({x: 1, y: 1});
        expect(board.missedAttacks).toContainEqual({x: 3, y: 2});
        expect(board.allShipsSunked()).toBe(false);
    })
    test('All ships sunked', () => { 
        // Sink ship1
        board.receiveAttack(3,3)
        board.receiveAttack(4,3)

        // Sink ship2
        board.receiveAttack(5,5)
        board.receiveAttack(6,5)
        board.receiveAttack(7,5)
        expect(board.allShipsSunked()).toBe(true);
    })
 })



    //test for ship collisions during placement

    //test for vertical placement 
import { Ship } from "../models/ship";


describe("Ship class", () => {
    const ship = new Ship(3)
    
    test("Not hit, No sunk", () => {
        expect(ship.isSunk()).toBe(false)
    });
    test("Not enough hit, still no sunk", () => {
        ship.hit();
        expect(ship.isSunk()).toBe(false)
    })
    test("Enough hit, now sunk", () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true)
    })

})
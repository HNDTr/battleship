class Gameboard{
    #size;
    #missedAttacks = [] //missed coordinates
    #ships = [] //stored ships coordinates

    constructor(size = 10){
        this.#size = size;
    }

    placeShip(ship, startX, startY, isVertial = false) {
        const coordinates = [];
        

        for (let i = 0; i < ship.length; i++){
            let x = isVertial ? startX : startX + i;
            let y = isVertial ? startY + i : startY;

            // check out of bound
            if (x >= this.#size || y >= this.#size){
                throw new Error('Ship placement is out of bound')
            }

            coordinates.push({x, y})
        }
        // check for collisions with other ships
        this.#ships.forEach((ship) => {
            ship.coordinates.forEach((coord) => { // [{1, 2}, {2, 2}, {3, 3}]
                if (coordinates.some(co => co.x === coord.x && co.y === coord.y)){
                    throw new Error('Ship placement is overlap')
                }
            })
        })

        this.#ships.push({ship, coordinates});
    }

    receiveAttack(x, y){
        // check if hit or miss

        // if hit, then change that ship hit to + 1
        this.#ships.forEach((placeShip) => {
                // hit
                let hitCoord = placeShip.coordinates.find(c => c.x === x && c.y === y)
                if (hitCoord){
                    placeShip.ship.hit();
                    return 'hit!';
                } 
        })

        // missed
        this.#missedAttacks.push({x, y});
        return "missed!"
    }
 
    get missedAttacks(){
        return this.#missedAttacks;
    }

    allShipsSunked(){
        return this.#ships.every(placeShip => placeShip.ship.isSunk())
    }
}

export {Gameboard}
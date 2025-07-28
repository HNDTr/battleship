class Gameboard{
    #size;
    #missedAttacks = [] //missed coordinates
    #hitAttacks = []
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
       
        // prevent re-attack
        const alreadyMissed = this.#missedAttacks.find(coord => coord.x === x && coord.y === y);
        const alreadyHit = this.#hitAttacks.find(coord => coord.x === x && coord.y === y);

        if (alreadyMissed || alreadyHit) {
            return 'already attacked!';
        }

        // if hit, then change that ship hit to + 1
        for (const placedShip of this.#ships) {
            const hitCoord = placedShip.coordinates.find(c => c.x === x && c.y === y);
            if (hitCoord) {
                placedShip.ship.hit();
                this.#hitAttacks.push({x, y});
                return 'hit!';
            }
        }
        // missed
        this.#missedAttacks.push({x, y});
        return "missed!"
    }
 
    get missedAttacks(){
        return this.#missedAttacks;
    }

    get hitAttacks(){
        return this.#hitAttacks;
    }

    allShipsSunked(){
        return this.#ships.every(placeShip => placeShip.ship.isSunk())
    }

    reset(){
        this.#ships = [];
        this.#missedAttacks = [];
        this.#hitAttacks = [];
    }

    get ships(){
        return this.#ships
    }
}

export {Gameboard}
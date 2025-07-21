class Ship {
    #hits = 0;
    #sunk = false;
    #length;

    constructor(length){
        this.#length = length;
    }

    hit(){
        this.#hits += 1;
        if(this.#hits >= this.#length){
            this.#sunk = true;
        }
    }

    isSunk(){
        return this.#sunk;
    }

    get length(){
        return this.#length;
    }

}

export {Ship}
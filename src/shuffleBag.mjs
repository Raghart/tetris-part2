export class shuffleTetrominoes {
    constructor(items) {
        this.items = items;
        this.bag = [];
        this.refill();
    };

    get length() { return this.bag.length };

    refill() {
        this.bag = [...this.items];
        for(let i= this.bag.length -1; i > 0 ; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
        };
    };

    next() {
        if (this.bag.length === 0) { this.refill(); };
        return this.bag.pop();
    }
};
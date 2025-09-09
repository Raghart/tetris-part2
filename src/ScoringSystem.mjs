export class ScoringSystem {
    constructor(level = 0) {
        this.score = 0;
        this.level = level;
    }

    calculateScore(event) {
        if (event.type === "updateScoring") {
            const levelMultiplier = this.level + 1;
            switch(event.linesCleared) {
                case 1:
                    this.score += 40 * levelMultiplier;
                    break;
                case 2:
                    this.score += 100 * levelMultiplier;
                    break;
                case 3:
                    this.score += 300 * levelMultiplier;
                    break;
                case 4: 
                    this.score += 1200 * levelMultiplier; 
                    break;
            };
        };
    };

    getScore() { return this.score; }
};
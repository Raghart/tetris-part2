export class ScoringSystem {
    constructor() {
        this.score = 0;
    }

    calculateScore(event) {
        if (event.type === "updateScoring") {
            switch(event.linesCleared) {
                case 1:
                    this.score += event.linesCleared * 40;
                case 2:
                    this.score += event.linesCleared * 100;
                case 3:
                    this.score += event.linesCleared * 300;
                case 4: 
                    this.score += event.linesCleared * 1200;
            };
        };
    };
};
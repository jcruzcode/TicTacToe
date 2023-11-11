class TicTacToe {
    constructor() {
        this.myLetter = 'X';
        this.botLetter = 'O';
        this.winner = '';
        this.myMoves = [];
        this.botMoves = [];
        this.gameOver = false;
        this.count = 0;
        this.botCount = 0;
        this.score = 0;
        this.botScore = 0;
        this.tie = 0;
        this.board = [ 0, 0, 0,
                       0, 0, 0,
                       0, 0, 0 ];
    }

    letter() {
        return Math.floor(Math.random()*2) === 0 ? 'X' : 'O';
    }

    start() {
        if( this.letter() === 'O') {
            document.querySelector('p').innerText = `Bot goes first!`;
            this.botMove();
        } else {
            document.querySelector('p').innerText = `You go first!`;
        }
    }
    

    place(position, player) {
        if (player === 'me') {
            this.myMoves.push(position);

            document.querySelector(`#image${position}`).src = "./img/x.png"
            this.board[position] = this.myLetter;

        } else {
            this.botMoves.push(position);

            document.querySelector(`#image${position}`).src = "./img/circle.png"
            this.board[position] = this.botLetter;

        }
    }
    myMove(position) {
        this.count++;

        if (this.board[position] === 0) {
            this.place(position, 'me');

        }

        if (this.count > 2) {
            this.checkWin(this.myMoves, 'me');
        }
    }

    botMove() {
        this.botCount++;
        let position = Math.floor(Math.random() * 9);

        while (this.board[position] !== 0) {
            position = Math.floor(Math.random() * 9);
        }

        if (this.board[position] === 0) {
            this.place(position);
        }

        if (this.botCount > 2) {
            this.checkWin(this.botMoves, 'bot');
        }
    }

    checkWin(moves, player) {
        let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]];


        for (let i = 0; i < wins.length; i++) {
            if (this.subArray(wins[i], moves)) {
                if (player === 'me') {
                    this.winner = 'You';
                    this.score++;
                    document.querySelector('p').innerText = `${this.winner} win!`;
                    document.querySelector('body').style.backgroundColor = 'rgb(60, 179, 113)';
                    this.saveScores();
                    this.displayScore();

                } else if (player === 'bot') {
                    this.winner = 'The bot';
                    this.botScore++;
                    document.querySelector('p').innerText = `${this.winner} wins!`;
                    document.querySelector('body').style.backgroundColor = 'rgb(255, 0, 0)';
                    this.saveScores();
                    this.displayScore();
                }
                this.gameOver = true;
                break;
            }

        }

        if (!this.board.includes(0) && this.winner === '') {
            this.tie++;
            document.querySelector('p').innerText = `It's a tie!`;
            document.querySelector('body').style.backgroundColor = 'dodgerblue';
            this.saveScores();
            this.displayScore();
        }

    }

    saveScores() {
        localStorage.setItem('score', JSON.stringify(this.score));
        localStorage.setItem('botScore', JSON.stringify(this.botScore));
        localStorage.setItem('tie', JSON.stringify(this.tie));
    }

    getScores() {
        const score = localStorage.getItem('score');
        const myScore = JSON.parse(score);
        this.score = myScore;

        const bot = localStorage.getItem('botScore');
        const bScore = JSON.parse(bot);
        this.botScore = bScore;

        const tie = localStorage.getItem('tie');
        const t = JSON.parse(tie);
        this.tie = t;
    }

    displayScore() {
        document.querySelector('#score').innerText = this.score;
        document.querySelector('#bscore').innerText = this.botScore;
        document.querySelector('#tie').innerText = this.tie;
    }

    restart() {
        location.reload();
    }

    subArray(arr1, arr2) {
        if (arr1.length === 0 && arr2.length === 0) {
            return true;
        } else if (arr1.length === 0 && arr2.length > 0) {
            return false;
        }
        if (arr1.length > arr2.length) return false;

        for (let i = 0; i < arr1.length; i++) {
            if (!arr2.includes(arr1[i])) return false;
        }

        return true;
    }

}

const game = new TicTacToe();
game.getScores();
game.displayScore();
game.start();


for (let i = 0; i <= 8; i++) {
    document.querySelector(`#spot${i}`).addEventListener('click', () => {
        if (game.board[i] === 0) {
            if (!game.gameOver) {
                game.myMove(i);
            }
        }
        if (!game.gameOver) {
            game.botMove();
        }

    });
}

document.querySelector('#btn-restart').addEventListener('click', () => game.restart());

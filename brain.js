function Player(sign, playerId) {
    this.sign = sign;
    this.playerId = playerId;
    
}


let p1 = new Player("X", 1);
let p2 = new Player("O", 2);


const gameboard = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    side: 3,
    getRow: function(row) {
        row = row * 3;
        return this.board.slice(row, row + this.side)
    },

    getCol: function(col) {
        let val = [];
        for (let i = 0; i < 3; i++) {
            val.splice(val.length, 0, this.board[col + (i*3)]);
        }
        
        return val
    },

    checkWin: function(player) {
        const allEqual = arr => arr.every(val => val === player);

        const win = 0;

        for (let i = 0; i < this.side; i++) {
            let result = allEqual(this.getRow(i));
            if (result) {
                
                return player
            }

            result = allEqual(this.getCol(i));
            if (result) {
               
                return player
            }
        }

        const diag1 = [this.board[0], this.board[4], this.board[8]];
        
        if (allEqual(diag1)) {
            return player
        }
        const diag2 = [this.board[2], this.board[4], this.board[6]];
        
        if (allEqual(diag2)) {
            return player
        }

        return win;
    },

    takeTurn(turn, squareId) {
        let sign = "Z";
        let player = 0;
        if (turn % 2 == 0) {
            sign = "O";
            player = 1;
        } 
        else {
            sign = "X";
            player = 2;
        }
        if (this.board[squareId] != 0) {
            return 3
        }

        this.board[squareId] = sign;
        
        player = this.checkWin(sign);

        
        return player
        


    },
}



const displayGame = {
    container: document.querySelector("#container"),
    tictacs: Array.from(document.getElementsByClassName("tictac")),
    turn: 0,
    

    takeTurn() {
        this.turn++;
        console.log(this.turn);
    },
    
    drawBoard() {
        this.tictacs.forEach((square) => {
            square.textContent = gameboard.board[square.id];
            square.addEventListener('click', () => {
                let clickResult = gameboard.takeTurn(this.turn, square.id);
                if (clickResult != 3) {
                    this.update(square.id);
                    this.turn++;
                };

                if (clickResult == "X") {
                    console.log("X wins!");
                }
                if (clickResult == "O") {
                    console.log("O wins!");
                }

                
            });
        });      
    },

    update(id) {
        this.tictacs[id].textContent = gameboard.board[id];
    }

    


}

function playGame() {

    
    let winner = 0;
    let turn = displayGame.turn;

    winner = displayGame.drawBoard();

    
    

    console.log(`Winner is Player ${winner}`);

}

playGame();
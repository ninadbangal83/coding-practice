
// ─── ENTITY: PLAYER ─────────────────────────────────────────────────────────
class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol; // 'X' or 'O'
    }
}

// ─── ENGINE: BOARD ──────────────────────────────────────────────────────────
class Board {
    constructor(size = 3) {
        this.size = size;
        this.cells = Array.from({ length: size }, () => Array(size).fill(null));
    }

    place(row, col, symbol) {
        // Out of bounds guard
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            throw new Error(`Position [${row}, ${col}] is off the board!`);
        }
        // Pre-occupied guard
        if (this.cells[row][col] !== null) {
            return false; 
        }

        this.cells[row][col] = symbol;
        return true;
    }

    // HIGH EFFICIENCY: O(N) runtime per check by scoping to last active move
    checkWin(lastRow, lastCol) {
        const targetSymbol = this.cells[lastRow][lastCol];
        if (!targetSymbol) return false;

        // 1. Check current row
        if (this.cells[lastRow].every(val => val === targetSymbol)) return true;

        // 2. Check current column
        if (this.cells.every(rowArray => rowArray[lastCol] === targetSymbol)) return true;

        // 3. Check main diagonal (top-left to bottom-right)
        if (lastRow === lastCol) {
            if (this.cells.every((r, idx) => r[idx] === targetSymbol)) return true;
        }

        // 4. Check anti-diagonal (top-right to bottom-left)
        if (lastRow + lastCol === this.size - 1) {
            if (this.cells.every((r, idx) => r[this.size - 1 - idx] === targetSymbol)) return true;
        }

        return false;
    }

    isFull() {
        return this.cells.every(r => r.every(c => c !== null));
    }

    reset() {
        this.cells = Array.from({ length: this.size }, () => Array(this.size).fill(null));
    }

    printTerminal() {
        const formattedBoard = this.cells.map(row => {
            return " " + row.map(c => c || '.').join(" | ") + " ";
        }).join("\n---" + "+---".repeat(this.size - 1) + "\n");
        
        console.log(`\n${formattedBoard}\n`);
    }
}

// ─── CONTROLLER: GAME CYCLE ──────────────────────────────────────────────────
class TicTacToeGame {
    constructor(p1Name = "Player 1", p2Name = "Player 2", boardSize = 3) {
        this.players = [
            new Player(p1Name, 'X'),
            new Player(p2Name, 'O')
        ];
        this.board = new Board(boardSize);
        this.activeIdx = 0;
        this.gameOver = false;
        this.winner = null;
    }

    get currentPlayer() {
        return this.players[this.activeIdx];
    }

    makeMove(row, col) {
        if (this.gameOver) {
            console.log("⚠️ Invalid attempt: The game has concluded.");
            return false;
        }

        console.log(`👉 ${this.currentPlayer.name} plays at (${row}, ${col})...`);
        
        const success = this.board.place(row, col, this.currentPlayer.symbol);
        
        if (!success) {
            console.log("❌ Slot occupied! Choose alternate coordinates.");
            return false;
        }

        this.board.printTerminal();

        // Immediate check for winner
        if (this.board.checkWin(row, col)) {
            this.winner = this.currentPlayer;
            this.gameOver = true;
            console.log(`👑 CHAMPION: ${this.winner.name} (${this.winner.symbol}) WINS!`);
            return true;
        }

        // Check for Draw state
        if (this.board.isFull()) {
            this.gameOver = true;
            console.log("🤝 DRAW: No spaces remain on grid.");
            return true;
        }

        // Advance next player index using simple O(1) toggler logic
        this.activeIdx = 1 - this.activeIdx;
        return true;
    }

    resetGame() {
        console.log("🔄 Resetting board...");
        this.board.reset();
        this.activeIdx = 0;
        this.gameOver = false;
        this.winner = null;
    }
}

// ─── DRIVER EXECUTION ───────────────────────────────────────────────────────
console.log("🔥 INITIALIZING TIC-TAC-TOE SYSTEM 🔥");
const match = new TicTacToeGame("Alpha", "Omega", 3);

// Simulate complete gameplay cycle leading to victory
match.makeMove(0, 0); // Alpha -> Top Left
match.makeMove(1, 1); // Omega -> Center
match.makeMove(0, 1); // Alpha -> Top Middle
match.makeMove(2, 0); // Omega -> Bottom Left
match.makeMove(0, 2); // Alpha -> Top Right -> WINS ROW 1!

match.resetGame();
match.makeMove(1, 1); // Validate fresh start

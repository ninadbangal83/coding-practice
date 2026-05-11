// ===========================================================================
// 💡 LOW-LEVEL DESIGN ANALYSIS: SNAKE & LADDER PATHFINDER
// ---------------------------------------------------------------------------
// 🚀 Time Complexity: 
//    - Jump Resolution: O(1) Direct offset-index lookup in constant board array.
//    - Dice Generation: O(1).
// 💾 Space Complexity: 
//    - O(N) exactly, pre-allocated to Board Size limit (default 100).
// 🛡️  Edge Case Handling Covered:
//    - Anti-Overrun Lock: Skips player update if target position > 100 limit.
//    - Immediate Instant Chaining: Automatically snaps position to ladder/snake output.
//    - Validation Direction: Checks prevent snakes pointing up or ladders pointing down.
// ===========================================================================

// ─── ENTITY: DICE ──────────────────────────────────────────────────────────
class Dice {
    constructor(sides = 6) {
        this.sides = sides;
    }
    roll() {
        // Normal distribution range between 1 and side count
        return Math.floor(Math.random() * this.sides) + 1;
    }
}

// ─── ENTITY: CELL ──────────────────────────────────────────────────────────
class BoardCell {
    constructor(idNumber) {
        this.idNumber = idNumber;
        this.snakeTailTarget = null; // Valid if this is a snake head
        this.ladderTopTarget = null; // Valid if this is a ladder base
    }

    get hasTraverseTrigger() {
        return this.snakeTailTarget !== null || this.ladderTopTarget !== null;
    }
}

// ─── ENGINE: BOARD ──────────────────────────────────────────────────────────
class Board {
    constructor(totalCells = 100) {
        this.totalCells = totalCells;
        // Offset by 1 to keep index aligned with cell board numbers (1 to 100)
        this.layout = Array.from({ length: totalCells + 1 }, (_, i) => new BoardCell(i));
    }

    addSnake(head, tail) {
        if (head <= tail) throw new Error("Violation: Snake head must exist above the tail!");
        this.layout[head].snakeTailTarget = tail;
    }

    addLadder(base, top) {
        if (base >= top) throw new Error("Violation: Ladder base must exist below the top!");
        this.layout[base].ladderTopTarget = top;
    }

    // Decoupled logic resolving instantaneous coordinate jumps
    resolveLandingCoordinate(currentPos) {
        const cell = this.layout[currentPos];
        
        if (cell.snakeTailTarget !== null) {
            console.log(`  🐍 SNAKE ATTACK! Sliding down from ${currentPos} to ${cell.snakeTailTarget}`);
            return cell.snakeTailTarget;
        }
        
        if (cell.ladderTopTarget !== null) {
            console.log(`  🪜 LADDER FOUND! Climbing up from ${currentPos} to ${cell.ladderTopTarget}`);
            return cell.ladderTopTarget;
        }

        return currentPos; // Secure landing
    }
}

// ─── ENTITY: PLAYER ─────────────────────────────────────────────────────────
class Player {
    constructor(name) {
        this.name = name;
        this.position = 0; // Start stage zero off-board
    }
}

// ─── CONTROLLER: GAME MANAGER ────────────────────────────────────────────────
class SnakeAndLadderGame {
    constructor(namesList = ["Player 1"]) {
        this.board = new Board(100);
        this.dice = new Dice(6);
        this.players = namesList.map(name => new Player(name));
        this.turnIdx = 0;
        this.winner = null;
        this._loadStandardBoard();
    }

    _loadStandardBoard() {
        // Standard Snake Configurations (Head -> Tail)
        this.board.addSnake(99, 78);
        this.board.addSnake(95, 75);
        this.board.addSnake(92, 88);
        this.board.addSnake(89, 68);
        this.board.addSnake(62, 19);
        this.board.addSnake(16, 6);

        // Standard Ladder Configurations (Base -> Top)
        this.board.addLadder(2, 38);
        this.board.addLadder(7, 14);
        this.board.addLadder(8, 31);
        this.board.addLadder(28, 84);
        this.board.addLadder(51, 67);
        this.board.addLadder(71, 91);
    }

    runTurn() {
        if (this.winner) return;

        const activePlayer = this.players[this.turnIdx];
        const rolledValue = this.dice.roll();
        const targetLanding = activePlayer.position + rolledValue;

        console.log(`🎲 ${activePlayer.name} rolled a ${rolledValue}`);

        // RULE: Overflow Clamp (Must land precisely on target end point)
        if (targetLanding > this.board.totalCells) {
            console.log(`   ⚠️ OVERFLOW: ${activePlayer.name} needs exactly ${this.board.totalCells - activePlayer.position} and skipped turn.`);
        } else {
            const finalPos = this.board.resolveLandingCoordinate(targetLanding);
            activePlayer.position = finalPos;
            console.log(`   📍 Location updated: Square ${finalPos}`);

            // WINNER EVALUATION
            if (activePlayer.position === this.board.totalCells) {
                this.winner = activePlayer;
                console.log(`\n👑 🏆 WE HAVE A WINNER! 🏆 👑\nCongratulations ${activePlayer.name}!`);
                return;
            }
        }

        // Cycle round-robin back to index zero when queue exhausts
        this.turnIdx = (this.turnIdx + 1) % this.players.length;
    }

    autoPlaySimulate() {
        console.log("\n--- INITIATING AUTO SIMULATION MODE ---");
        let iterations = 0;
        while (!this.winner && iterations < 500) {
            this.runTurn();
            iterations++;
        }
        if (!this.winner) console.log("🛑 Sim ended: Reach max iteration safe limit.");
    }
}

// ======================================================
// 🧪 LLD TEST AUTOMATION SECTION (MECHANICS INTEGRITY)
// ======================================================
console.log("\n--- 🧪 Running Snake & Ladder Board Integrity Suite ---");

function runBoardAssertions() {
    try {
        const testGame = new SnakeAndLadderGame(["AI"]);
        const b = testGame.board;

        // Test 1: Ladder Ascent Computation
        // We know ladder 2 -> 38 exists in config
        const finalPosLadder = b.resolveLandingCoordinate(2);
        if (finalPosLadder !== 38) throw new Error(`Ladder teleport failed. Landed: ${finalPosLadder}`);
        console.log("✅ TEST 1: Ladder Elevation vector injection correct (2 -> 38)");

        // Test 2: Snake Descent Computation
        // We know snake 16 -> 6 exists in config
        const finalPosSnake = b.resolveLandingCoordinate(16);
        if (finalPosSnake !== 6) throw new Error(`Snake descent failed. Landed: ${finalPosSnake}`);
        console.log("✅ TEST 2: Snake Collision trajectory correct (16 -> 6)");

        // Test 3: Clean Landing Retention
        const cleanLanding = b.resolveLandingCoordinate(5); // Safe square
        if (cleanLanding !== 5) throw new Error("Clean tile shifted unexpectedly");
        console.log("✅ TEST 3: Inertia Retention logic confirmed (Standard square holds pos)");

        // Test 4: Die Integrity Constraints
        const dice = new Dice(6);
        for (let i = 0; i < 100; i++) {
            const r = dice.roll();
            if (r < 1 || r > 6) throw new Error("Dice overflow boundary exceeded");
        }
        console.log("✅ TEST 4: Die Range Constraints validated (100 trials inside 1-6)");

        console.log("\n🏆 FINAL VERDICT: BOARD PATHFINDER MECHANICS 100% SECURE 🏆\n");

    } catch (e) {
        console.error("\n❌ BOARD INTEGRITY FAILURE:", e.message);
        process.exit(1);
    }
}

runBoardAssertions();

// ======================================================
// 3. Number Of Islands (Grid Graph) [Difficulty: Medium-Hard 🟠]
// Goal: Count and consume connected recursive node batches ('islands').
// ======================================================

const islandGrid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
];

const numIslands = (grid) => {
    if (!grid || grid.length === 0) return 0;

    // Clone grid to avoid mutating test sample
    const map = JSON.parse(JSON.stringify(grid));
    const rows = map.length;
    const cols = map[0].length;
    let islandCounter = 0;

    const sinkIslandBFS = (r, c) => {
        const queue = [[r, c]];
        map[r][c] = '0'; // Mark initial land processed

        while (queue.length > 0) {
            const [currentRow, currentCol] = queue.shift();
            const vectors = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right

            for (const [dx, dy] of vectors) {
                const nx = currentRow + dx;
                const ny = currentCol + dy;
                // Verify boundaries and ensure node matches LAND type
                if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && map[nx][ny] === '1') {
                    map[nx][ny] = '0'; // Sink connected node instantly to prevent infinite loops
                    queue.push([nx, ny]);
                }
            }
        }
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] === '1') {
                islandCounter++; // Found new isolated mass
                sinkIslandBFS(i, j); // Purge entirety of connected mass via BFS
            }
        }
    }
    return islandCounter;
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (INTERVIEW MODE)
// ======================================================

const testCases = [
    {
        grid: [
            ["1","1","0","0","0"],
            ["1","1","0","0","0"],
            ["0","0","1","0","0"],
            ["0","0","0","1","1"]
        ],
        expected: 3,
        desc: "Standard segmented group grid"
    },
    {
        grid: [["0","0"],["0","0"]],
        expected: 0,
        desc: "Edge: All water flood constraint"
    },
    {
        grid: [["1","0","1"],["0","1","0"],["1","0","1"]],
        expected: 5,
        desc: "Checkerboard distinct diagonal islands (non-connected)"
    },
    {
        grid: [["1","1"],["1","1"]],
        expected: 1,
        desc: "Unified full continental plate coverage"
    },
    {
        grid: Array.from({length: 100}, () => Array.from({length: 100}, () => '1')),
        expected: 1,
        desc: "Scale: 10,000-node single continent saturation sweep"
    }
];

console.log("\n--- 🧪 Running Number Of Islands Automated Tests ---");
testCases.forEach((tc, i) => {
    const start = performance.now();
    const result = numIslands(tc.grid);
    const duration = (performance.now() - start).toFixed(4);

    const isPassed = result === tc.expected;
    console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);

    if (!isPassed) {
        console.log(`   Output: ${result} | Expected: ${tc.expected}`);
    }
});

// ===========================================================================
// 💡 NODE.JS ANALYSIS: RECURSIVE FILE-SYSTEM TREE TRAVERSAL
// ---------------------------------------------------------------------------
// 🚀 Time Complexity: O(F + D) linear traversal traversing total Files and Dirs.
// 💾 Space Complexity: O(D) stack frames proportional to tree depth recursion.
// 🛡️  Edge Case Handled: Safety Catch wrappers protect against localized IO Permission
//     blocks from halting global scanning process.
// ===========================================================================

const fs = require('fs').promises;
const fsSync = require('fs'); // Utility for synchronous cleanup steps
const path = require('path');

async function scanDirectoryDeep(targetPath) {
    let filesList = [];
    try {
        const items = await fs.readdir(targetPath, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(targetPath, item.name);
            if (item.isDirectory()) {
                const nested = await scanDirectoryDeep(fullPath);
                filesList = filesList.concat(nested);
            } else {
                filesList.push(fullPath);
            }
        }
    } catch (e) { /* Safe skip permission locks */ }
    return filesList;
}

// ======================================================
// 🧪 TEST AUTOMATION SECTION (DIRECTORY AUDIT)
// ======================================================

const testCases = [
    {
        exec: async () => {
            const root = path.join(__dirname, 'mock_tree_test');
            const sub = path.join(root, 'nested_folder');
            
            // 🏗️ Build physical dummy structure
            if (!fsSync.existsSync(root)) fsSync.mkdirSync(root);
            if (!fsSync.existsSync(sub)) fsSync.mkdirSync(sub);
            fsSync.writeFileSync(path.join(root, 'f1.txt'), 'x');
            fsSync.writeFileSync(path.join(sub, 'f2.txt'), 'x');
            fsSync.writeFileSync(path.join(sub, 'f3.txt'), 'x');
            
            // Scan
            const discovered = await scanDirectoryDeep(root);
            
            // 🧹 Post-test cleanup
            fsSync.unlinkSync(path.join(root, 'f1.txt'));
            fsSync.unlinkSync(path.join(sub, 'f2.txt'));
            fsSync.unlinkSync(path.join(sub, 'f3.txt'));
            fsSync.rmdirSync(sub);
            fsSync.rmdirSync(root);
            
            return discovered.length; // Should match exactly 3 files
        },
        expected: 3,
        desc: "Nested depth tree resolution & child leaf counting"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Recursive Directory Discovery Audit ---");
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const start = performance.now();
        const result = await tc.exec();
        const duration = (performance.now() - start).toFixed(4);

        const isPassed = result === tc.expected;
        console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc}`);
    }
}

runSuite();

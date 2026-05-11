// ===========================================================================
// 💡 BACKEND ANALYSIS: ENTERPRISE CLEAN ARCHITECTURE (EXPRESS)
// ---------------------------------------------------------------------------
// 🚀 Time Complexity: O(1) simulated controller delegation pipeline.
// 💾 Space Complexity: O(1) per-request middleware execution frame.
// 🛡️  Edge Case Handled: Auto-Catching asynchronous unhandled Promise rejections,
//     ensuring zero node-server crashes due to forgotten try/catch guards.
// ===========================================================================

class AppError extends Error {
    constructor(msg, status = 500) {
        super(msg);
        this.statusCode = status;
        this.isOperational = true; 
    }
}

const autoCatch = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); 
};

const DatabaseMock = {
    users: [
        { id: 1, name: "Alice", active: true },
        { id: 2, name: "Bob", active: false }
    ],
    async findById(uid) {
        return this.users.find(u => u.id === parseInt(uid));
    }
};

const UserLogicService = {
    async fetchActiveProfile(userId) {
        const user = await DatabaseMock.findById(userId);
        if (!user) throw new AppError("Not Found", 404);
        if (!user.active) throw new AppError("Forbidden", 403);
        return user;
    }
};

const HTTPUserController = {
    getProfile: autoCatch(async (req, res) => {
        const requestedId = req.params.id;
        const safeUser = await UserLogicService.fetchActiveProfile(requestedId);
        res.status(200).send({ data: safeUser });
    })
};

// --- SIMULATOR HARNESS FOR ASSERTIONS ---
const executeServerRequestAssert = (mockReq) => {
    return new Promise((resolve) => {
        const mockRes = {
            status(code) { this.code = code; return this; },
            send(payload) { resolve({ code: this.code, payload }); }
        };

        const nextTrigger = (error) => {
            const statusCode = error.statusCode || 500;
            resolve({ code: statusCode, payload: error.message });
        };

        HTTPUserController.getProfile(mockReq, mockRes, nextTrigger);
    });
};

// ======================================================
// 🧪 TEST AUTOMATION SECTION (CLEAN ARCH AUDIT)
// ======================================================

const testCases = [
    {
        exec: async () => await executeServerRequestAssert({ params: { id: 1 } }),
        expected: 200,
        desc: "Valid Active Profile Retrieval via Success Chain"
    },
    {
        exec: async () => await executeServerRequestAssert({ params: { id: 2 } }),
        expected: 403,
        desc: "Service Violation Interception (Dormant Account Lock)"
    },
    {
        exec: async () => await executeServerRequestAssert({ params: { id: 99 } }),
        expected: 404,
        desc: "Repository Empty Vector Guard (No ID matches in Index)"
    }
];

async function runSuite() {
    console.log("\n--- 🧪 Running Clean Architecture Logic Auditing ---");
    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const start = performance.now();
        const result = await tc.exec();
        const duration = (performance.now() - start).toFixed(4);

        const isPassed = result.code === tc.expected;
        console.log(`Test ${i + 1}: ${isPassed ? "✅ PASS" : "❌ FAIL"} [${duration}ms] | ${tc.desc} (Code: ${result.code})`);
    }
}

runSuite();

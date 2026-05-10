
// ======================================================
// 🚀 ENTERPRISE CLEAN ARCHITECTURE SIMULATOR (Express Core Pattern)
// ======================================================

// --- COMPONENT 1: CUSTOM ERROR WRAPPER (Extensibility) ---
class AppError extends Error {
    constructor(msg, status = 500) {
        super(msg);
        this.statusCode = status;
        this.isOperational = true; // Flag identifying expected safe business violations
    }
}

// --- COMPONENT 2: GLOBAL ASYNC CAPTURE WRAPPER ---
// Prevents redundant try/catch noise in Controllers
const autoCatch = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); // Drains directly into global error handler
};


// ======================================================
// LAYER 1: DATA REPOSITORY (Pure Database Logic)
// ======================================================
const DatabaseMock = {
    users: [
        { id: 1, name: "Alice", active: true },
        { id: 2, name: "Bob", active: false }
    ],
    async findById(uid) {
        return this.users.find(u => u.id === parseInt(uid));
    }
};


// ======================================================
// LAYER 2: SERVICE LAYER (Core Business Rules)
// ======================================================
const UserLogicService = {
    async fetchActiveProfile(userId) {
        const user = await DatabaseMock.findById(userId);
        
        if (!user) {
            throw new AppError("Target Identity Not Located In Server Index.", 404);
        }

        if (!user.active) {
            throw new AppError("Security Protocol: Account currently dormant.", 403);
        }

        return user; // Verified payload
    }
};


// ======================================================
// LAYER 3: CONTROLLER LAYER (HTTP Interface)
// ======================================================
const HTTPUserController = {
    // Clean, no try-catch! Handled by autoCatch wrapper.
    getProfile: autoCatch(async (req, res) => {
        const requestedId = req.params.id;
        console.log(`\n🌐 API INCOMING: GET /api/users/${requestedId}`);

        // Delegate pure business verification to independent Service Layer
        const safeUser = await UserLogicService.fetchActiveProfile(requestedId);

        // Deliver strict consistent uniform JSON payload structure
        res.status(200).send({
            success: true,
            data: safeUser,
            message: "Profile successfully secured."
        });
    })
};


// ======================================================
// 🏗️ MOCK SERVER ENVIRONMENT RUNTIME SIMULATOR
// ======================================================

// Simple Express Middleware Chain Emulator
const executeServerRequestSim = (mockReq, mockController) => {
    
    // Mock Response Object utilizing chainable method mocks
    const mockRes = {
        status(code) {
            this.code = code;
            return this;
        },
        send(payload) {
            console.log(`   ✅ HTTP ${this.code} RESPONDED:`, payload);
        }
    };

    // 🛡️ Global Final Catch-All Error Handling Middleware Layer
    const nextTrigger = (error) => {
        const statusCode = error.statusCode || 500;
        console.log(`   🚨 HTTP ${statusCode} ERROR CAUGHT:`, {
            success: false,
            error: error.message
        });
    };

    // Initiate execution flow
    mockController(mockReq, mockRes, nextTrigger);
};


// ======================================================
// 🚦 DRIVER SIMULATION TESTING
// ======================================================

console.log("🔥 BOOTING BACKEND SIMULATOR ENGINE 🔥");

// SCENARIO A: Successful Retrieval (Alice)
const reqValid = { params: { id: 1 } };
executeServerRequestSim(reqValid, HTTPUserController.getProfile);

// SCENARIO B: Business Violation Trigger (Bob is Inactive -> 403)
const reqDormant = { params: { id: 2 } };
executeServerRequestSim(reqDormant, HTTPUserController.getProfile);

// SCENARIO C: Database Absence Trigger (Not Found -> 404)
const reqMissing = { params: { id: 99 } };
executeServerRequestSim(reqMissing, HTTPUserController.getProfile);

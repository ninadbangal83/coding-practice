
// ─── SYSTEM ENUMERATION: ELEVATOR VECTORS ───────────────────────────────────
const ElevatorDirection = Object.freeze({
    UP: 'UP',
    DOWN: 'DOWN',
    IDLE: 'IDLE'
});

// ─── ENTITY: EXTERNAL REQUEST ───────────────────────────────────────────────
class FloorCallRequest {
    constructor(floor, vector) {
        this.floor = floor;
        this.vector = vector;
    }
}

// ─── ENGINE: ELEVATOR UNIT ──────────────────────────────────────────────────
class ElevatorCar {
    constructor(unitId) {
        this.unitId = unitId;
        this.currentPos = 1; // Default initial positioning at floor 1
        this.vector = ElevatorDirection.IDLE;
        this.stopQueue = new Set(); // Utilize sets to prune redundant duplicate floor presses
    }

    injectTarget(floorNum) {
        this.stopQueue.add(floorNum);
        this._recalculateVector();
        console.log(`Unit ${this.unitId}: Queued floor ${floorNum}. (Full Queue: [${[...this.stopQueue]}])`);
    }

    // Simulate standard discrete time increment traversal
    executeIncrementStep() {
        if (this.stopQueue.size === 0) {
            this.vector = ElevatorDirection.IDLE;
            return; // Hold position
        }

        const immediateTarget = this._getOptimalNextTarget();
        
        // Physically shift positioning by 1 increment towards the target vector
        if (immediateTarget > this.currentPos) {
            this.currentPos++;
        } else if (immediateTarget < this.currentPos) {
            this.currentPos--;
        }

        // Verify arrival logic
        if (this.currentPos === immediateTarget) {
            this.stopQueue.delete(this.currentPos); // Pop target from resolution set
            console.log(`🛎️  Unit ${this.unitId}: ARRIVED at Floor ${this.currentPos}`);
            this._cycleSafetyDoors();
        }

        this._recalculateVector();
    }

    _getOptimalNextTarget() {
        const pendingList = [...this.stopQueue];

        // SCENARIO 1: Actively Moving UP
        if (this.vector === ElevatorDirection.UP) {
            const higherStops = pendingList.filter(f => f > this.currentPos);
            if (higherStops.length > 0) return Math.min(...higherStops); // Grab nearest upwards
        }
        // SCENARIO 2: Actively Moving DOWN
        if (this.vector === ElevatorDirection.DOWN) {
            const lowerStops = pendingList.filter(f => f < this.currentPos);
            if (lowerStops.length > 0) return Math.max(...lowerStops); // Grab nearest downwards
        }

        // SCENARIO 3: IDLE fallback -> execute simple absolute distance logic
        return pendingList.reduce((best, curr) => 
            Math.abs(curr - this.currentPos) < Math.abs(best - this.currentPos) ? curr : best
        );
    }

    _recalculateVector() {
        if (this.stopQueue.size === 0) {
            this.vector = ElevatorDirection.IDLE;
        } else {
            const target = this._getOptimalNextTarget();
            this.vector = target > this.currentPos ? ElevatorDirection.UP : ElevatorDirection.DOWN;
        }
    }

    _cycleSafetyDoors() {
        console.log(`  🚪 Unit ${this.unitId} - Opening/Closing Access Gates...`);
    }

    // Dispatch Engine: Calculate theoretical 'distance + penalty' score
    calculateDispatchScore(request) {
        const radialDistance = Math.abs(this.currentPos - request.floor);

        // Priority Penalty System: If elevator goes opposite way, inflate its score (making it less desirable)
        let dynamicPenalty = 0;
        if (this.vector !== ElevatorDirection.IDLE && this.vector !== request.vector) {
            dynamicPenalty = 8; // Heavy deterrent to interrupt opposite-stream traversal
        }

        return radialDistance + dynamicPenalty;
    }
}

// ─── BRAIN: DISPATCH CONTROLLER ──────────────────────────────────────────────
class ElevatorController {
    constructor(unitList) {
        this.fleet = unitList;
    }

    routeExternalCall(req) {
        // Analyze fleet metrics and assign logic directly to absolute minimum score holder
        const designatedUnit = this.fleet.reduce((bestUnit, currentCandidate) => {
            const candidateScore = currentCandidate.calculateDispatchScore(req);
            const bestScore = bestUnit.calculateDispatchScore(req);
            return candidateScore < bestScore ? currentCandidate : bestUnit;
        });

        console.log(`📡 DISPATCH: Unit ${designatedUnit.unitId} mapped to floor ${req.floor}.`);
        designatedUnit.injectTarget(req.floor);
    }

    routeInternalButton(unitId, destFloor) {
        const targetUnit = this.fleet.find(u => u.unitId === unitId);
        if (targetUnit) targetUnit.injectTarget(destFloor);
    }
}

// ─── CONTAINER: BUILDING MASTER ─────────────────────────────────────────────
class BuildingSystem {
    constructor(totalFloors, carsCount) {
        this.totalFloors = totalFloors;
        const fleet = Array.from({ length: carsCount }, (_, i) => new ElevatorCar(i + 1));
        this.dispatch = new ElevatorController(fleet);
    }

    userCallElevator(fromFloor, goalDirection) {
        console.log(`\n📢 USER REQUEST: Waiting on Floor ${fromFloor} wanting to go ${goalDirection}`);
        this.dispatch.routeExternalCall(new FloorCallRequest(fromFloor, goalDirection));
    }

    userPressDestination(inUnitId, toFloor) {
        console.log(`📟 INTERIOR INPUT: User inside Unit ${inUnitId} selected Floor ${toFloor}`);
        this.dispatch.routeInternalButton(inUnitId, toFloor);
    }

    runSimulationCycle() {
        this.dispatch.fleet.forEach(unit => unit.executeIncrementStep());
    }
}

// ─── DRIVER SIMULATION ──────────────────────────────────────────────────────
console.log("🏙️  BOOTING SMART BUILDING ELEVATOR SIMULATOR 🏙️");
const corporateHQ = new BuildingSystem(20, 3); // 20 Floor Building, 3 Active Elevator Units

// Time Increment 0: Inputs arriving
corporateHQ.userCallElevator(8, ElevatorDirection.UP);
corporateHQ.userCallElevator(15, ElevatorDirection.DOWN);

// Run simulator step ticks enabling physical movement cycles
console.log("\n⏳ STARTING SIMULATION CYCLE CLOCK...\n");
for (let i = 1; i <= 10; i++) {
    console.log(`--- [T-Plus ${i}] ---`);
    corporateHQ.runSimulationCycle();
}

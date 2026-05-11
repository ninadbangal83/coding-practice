// ===========================================================================
// 💡 LOW-LEVEL DESIGN ANALYSIS: MULTI-STORY PARKING ARCHITECTURE
// ---------------------------------------------------------------------------
// 🚀 Time Complexity: 
//    - Park Allocation: O(F) scanning floors linearly to find open slots.
//    - Unpark Ticket Logic: O(1) Hash Map ID retrieval.
// 💾 Space Complexity: 
//    - O(Total Slots) pre-allocated tracking internal slot object graphs.
// 🛡️  Edge Case Handling Covered:
//    - Typed Slot Enforce: Forces cars -> Medium and bikes -> Small perfectly.
//    - Total Depletion: Stops processing and warns user when global slots = 0.
//    - Resource Leaks: Instantly returns freed memory objects to pool upon exit.
// ===========================================================================

// ─── ENUMS ─────────────────────────────────────────────────────────────────
const VehicleType = Object.freeze({ BIKE: 'BIKE', CAR: 'CAR', TRUCK: 'TRUCK' });
const SlotType    = Object.freeze({ SMALL: 'SMALL', MEDIUM: 'MEDIUM', LARGE: 'LARGE' });

// Vehicle type → required slot type
const VEHICLE_TO_SLOT = {
  [VehicleType.BIKE]:  SlotType.SMALL,
  [VehicleType.CAR]:   SlotType.MEDIUM,
  [VehicleType.TRUCK]: SlotType.LARGE,
};

// ─── VEHICLE ───────────────────────────────────────────────────────────────
class Vehicle {
  constructor(plate, type) {
    if (!Object.values(VehicleType).includes(type)) {
      throw new Error(`Invalid vehicle type: ${type}`);
    }
    this.plate = plate;
    this.type  = type;
  }
}

// ─── PARKING SLOT ─────────────────────────────────────────────────────────
class ParkingSlot {
  constructor(id, type, floorNumber) {
    this.id          = id;
    this.type        = type;
    this.floorNumber = floorNumber;
    this.isOccupied  = false;
    this.vehicle     = null;
    this.parkedAt    = null;
  }

  isAvailable() {
    return !this.isOccupied;
  }

  park(vehicle) {
    if (this.isOccupied) throw new Error(`Slot ${this.id} is already occupied`);
    this.isOccupied = true;
    this.vehicle    = vehicle;
    this.parkedAt   = new Date();
  }

  // Returns duration in hours
  unpark() {
    if (!this.isOccupied) throw new Error(`Slot ${this.id} is empty`);
    const durationMs  = Date.now() - this.parkedAt.getTime();
    const durationHrs = durationMs / (1000 * 60 * 60);
    this.isOccupied   = false;
    this.vehicle      = null;
    this.parkedAt     = null;
    return durationHrs;
  }
}

// ─── PARKING FLOOR ────────────────────────────────────────────────────────
class ParkingFloor {
  constructor(floorNumber, slotConfig) {
    this.floorNumber = floorNumber;
    this.slots       = [];

    for (const [type, count] of Object.entries(slotConfig)) {
      for (let i = 0; i < count; i++) {
        const id = `F${floorNumber}-${type}-${i + 1}`;
        this.slots.push(new ParkingSlot(id, type, floorNumber));
      }
    }
  }

  getAvailableSlot(slotType) {
    return this.slots.find(s => s.type === slotType && s.isAvailable()) || null;
  }

  getAvailableCount(slotType) {
    return this.slots.filter(s => s.type === slotType && s.isAvailable()).length;
  }
}

// ─── TICKET ────────────────────────────────────────────────────────────────
class ParkingTicket {
  constructor(ticketId, slot, vehicle) {
    this.ticketId  = ticketId;
    this.slot      = slot;
    this.vehicle   = vehicle;
    this.issuedAt  = new Date();
  }
}

// ─── PARKING LOT ────────────────────────────────────────────────────────────
class ParkingLot {
  constructor(name) {
    this.name    = name;
    this.floors  = [];
    this.tickets = new Map();
    this.rates   = {
      [SlotType.SMALL]:  20,
      [SlotType.MEDIUM]: 40,
      [SlotType.LARGE]:  80,
    };
    this._ticketCounter = 1;
  }

  addFloor(floor) {
    this.floors.push(floor);
  }

  park(vehicle) {
    const requiredSlotType = VEHICLE_TO_SLOT[vehicle.type];

    let availableSlot = null;
    for (const floor of this.floors) {
      availableSlot = floor.getAvailableSlot(requiredSlotType);
      if (availableSlot) break;
    }

    if (!availableSlot) {
      throw new Error(`No available ${requiredSlotType} slot for ${vehicle.type}`);
    }

    availableSlot.park(vehicle);

    const ticketId = `TKT-${String(this._ticketCounter++).padStart(4, '0')}`;
    const ticket   = new ParkingTicket(ticketId, availableSlot, vehicle);
    this.tickets.set(ticketId, ticket);

    console.log(`✅ SUCCESS: Parked ${vehicle.plate} at ${availableSlot.id}.`);
    return ticketId;
  }

  unpark(ticketId) {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) throw new Error(`Invalid ticket: ${ticketId}`);

    const durationHrs = ticket.slot.unpark();
    const hours       = Math.ceil(durationHrs) || 1; // Force ceil for billing
    const fee         = hours * this.rates[ticket.slot.type];

    this.tickets.delete(ticketId);

    console.log(
      `🚗 EXIT: ${ticket.vehicle.plate} exited ${ticket.slot.id}. ` +
      `Duration: ~${hours}h. Total Fee: ₹${fee}`
    );
    return { fee, durationHrs };
  }

  getAvailability() {
    const result = {};
    for (const type of Object.values(SlotType)) {
      result[type] = this.floors.reduce((sum, floor) => sum + floor.getAvailableCount(type), 0);
    }
    return result;
  }

  printStatus() {
    const avail = this.getAvailability();
    console.log(`\n--- Status: ${this.name} ---`);
    Object.entries(avail).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} open slots`);
    });
    console.log('-------------------------------\n');
  }
}

// ======================================================
// 🧪 LLD TEST AUTOMATION SECTION (SYSTEM INTEGRITY)
// ======================================================
console.log("\n--- 🧪 Running LLD Parking Lot System Integration Tests ---");

function runSystemAssertions() {
  try {
    // 1. Setup System
    const testLot = new ParkingLot('Test Domain');
    testLot.addFloor(new ParkingFloor(1, { SMALL: 2, MEDIUM: 1, LARGE: 0 }));

    // 2. Base State Verification
    let initial = testLot.getAvailability();
    if (initial.SMALL !== 2 || initial.MEDIUM !== 1) throw new Error("Initialization state mismatch");
    console.log("✅ TEST 1: Base Configuration Injected Perfectly");

    // 3. Park Transaction & Depletion Assert
    const bike = new Vehicle('B-1', VehicleType.BIKE);
    const ticket = testLot.park(bike);
    
    let current = testLot.getAvailability();
    if (current.SMALL !== 1) throw new Error("Small slot count failure after parking bike");
    console.log("✅ TEST 2: State Depletion Mutated Correctly (2 -> 1)");

    // 4. Capacity Guard Assertion
    try {
      const car1 = new Vehicle('C-1', VehicleType.CAR);
      const car2 = new Vehicle('C-2', VehicleType.CAR);
      testLot.park(car1); // Consumes the ONLY medium slot
      testLot.park(car2); // Should throw
      throw new Error("Allowed overcapacity!");
    } catch (e) {
       if (!e.message.includes("No available")) throw e; // Valid rejection!
       console.log("✅ TEST 3: Over-capacity Threshold Safety Handler Success");
    }

    // 5. Unpark & Restore Assert
    testLot.unpark(ticket);
    let finalState = testLot.getAvailability();
    if (finalState.SMALL !== 2) throw new Error("Small slot restoration failure after exit");
    console.log("✅ TEST 4: Memory Reclamation (Unpark Restored Capacity)");

    console.log("\n🏆 FINAL VERDICT: LLD SYSTEM STATE MACHINE FULLY GREEN! 🏆");

  } catch (err) {
    console.error("\n❌ LLD INTEGRITY TEST FAILED:", err.message);
    process.exit(1);
  }
}

runSystemAssertions();

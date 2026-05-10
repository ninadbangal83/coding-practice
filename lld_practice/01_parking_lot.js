
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

// ─── DRIVER DEMO ───────────────────────────────────────────────────────────
console.log("🚀 BOOTSTRAPPING PARKING LOT SYSTEM...");
const myLot = new ParkingLot('Central Metro Plaza');

myLot.addFloor(new ParkingFloor(1, { SMALL: 2, MEDIUM: 5, LARGE: 1 }));
myLot.addFloor(new ParkingFloor(2, { SMALL: 2, MEDIUM: 5, LARGE: 1 }));

myLot.printStatus();

const myBike = new Vehicle('BIKE-777', VehicleType.BIKE);
const myCar  = new Vehicle('CAR-999', VehicleType.CAR);

const bikeTicket = myLot.park(myBike);
const carTicket  = myLot.park(myCar);

myLot.printStatus();

myLot.unpark(carTicket);

myLot.printStatus();

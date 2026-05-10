
// ===========================================================================
// ─── ALGORITHM 1: TOKEN BUCKET (Supports Bursting) ────────────────────────
// ===========================================================================

class TokenBucket {
    /**
     * @param {number} capacity   - Maximum stored tokens (burst capacity)
     * @param {number} refillRate - Refill speed (tokens added per second)
     */
    constructor(capacity, refillRate) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = capacity; // Starts filled
        this.lastRefill = Date.now();
    }

    _refill() {
        const now = Date.now();
        const elapsedSeconds = (now - this.lastRefill) / 1000;
        
        // Refill based on elapsed time, clamping at max capacity
        this.tokens = Math.min(
            this.capacity,
            this.tokens + (elapsedSeconds * this.refillRate)
        );
        this.lastRefill = now;
    }

    consume(requiredTokens = 1) {
        this._refill();

        if (this.tokens >= requiredTokens) {
            this.tokens -= requiredTokens;
            return { allowed: true, remaining: Math.floor(this.tokens) };
        }
        return { allowed: false, remaining: 0 };
    }
}

// Managing dynamic mapping of multiple buckets to unique user ID keys
class RateLimiterManager {
    constructor(capacity = 5, refillRate = 1) {
        this.userCache = new Map(); // UserKey -> TokenBucket Instance
        this.config = { capacity, refillRate };
    }

    check(userId) {
        if (!this.userCache.has(userId)) {
            this.userCache.set(userId, new TokenBucket(this.config.capacity, this.config.refillRate));
        }
        const bucket = this.userCache.get(userId);
        return bucket.consume();
    }
}


// ===========================================================================
// ─── ALGORITHM 2: SLIDING WINDOW LOG (High Precision) ─────────────────────
// ===========================================================================

class SlidingWindowLimiter {
    /**
     * @param {number} limit     - Maximum number of concurrent requests allowed in log
     * @param {number} windowMs  - Expiration boundary of history in milliseconds
     */
    constructor(limit = 10, windowMs = 60000) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.logs = new Map(); // Key -> Array of request timestamps
    }

    tryHit(key) {
        const now = Date.now();
        const expirationThreshold = now - this.windowMs;

        if (!this.logs.has(key)) {
            this.logs.set(key, []);
        }

        const historicalTimestamps = this.logs.get(key);

        // ⚡ PRUNING PHASE: Dump logs that have aged past the valid time window
        while (historicalTimestamps.length > 0 && historicalTimestamps[0] <= expirationThreshold) {
            historicalTimestamps.shift();
        }

        // 🔒 GATE PHASE: Verify current traffic count against rigid capacity limit
        if (historicalTimestamps.length < this.limit) {
            historicalTimestamps.push(now); // Write valid transaction to the log
            return { 
                status: "OK", 
                remaining: this.limit - historicalTimestamps.length 
            };
        }

        // 🚨 REJECT PHASE: Calculate dynamic retry window
        const waitSeconds = Math.ceil(((historicalTimestamps[0] + this.windowMs) - now) / 1000);
        return { 
            status: "DENIED", 
            retryAfter: waitSeconds 
        };
    }
}


// ===========================================================================
// ─── DRIVER CODE ───────────────────────────────────────────────────────────
// ===========================================================================

console.log("\n🚀 SCENARIO A: Token Bucket Burst Test (Limit 3, refill 1/sec)");
const apiLimiter = new RateLimiterManager(3, 1);

const testUser = "user_001";

// Fire 5 rapid bursts instantly
for (let i = 1; i <= 5; i++) {
    const res = apiLimiter.check(testUser);
    console.log(`Req #${i}: ${res.allowed ? "✅ ALLOWED" : "❌ DENIED"} (Left: ${res.remaining})`);
}


console.log("\n🚀 SCENARIO B: Sliding Window Log (Strict limit 2 requests per minute)");
const strictLimiter = new SlidingWindowLimiter(2, 60000);
const ip = "192.168.1.1";

console.log("Request 1:", strictLimiter.tryHit(ip));
console.log("Request 2:", strictLimiter.tryHit(ip));
console.log("Request 3:", strictLimiter.tryHit(ip)); // Should fail

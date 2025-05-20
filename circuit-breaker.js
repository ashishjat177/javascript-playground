function circuitBreaker(func, retriesCount, thresholdTime) {
    let failureCount = 0;
    let timeSinceLastFailure = null; // Use null initially
    let state = 'closed';

    return function (...args) {
        console.log(`Current state: ${state}, Failure count: ${failureCount}`);
    console.log(new Date() - timeSinceLastFailure)


        // Check if the circuit is open (service is down)
        if (state === 'open') {
            if (new Date() - timeSinceLastFailure >= thresholdTime) {
                console.log("Attempting to move to half-open state");
                state = 'half-open';
            } else {
                console.log('Service is down. Circuit is open.');
                return 'Service is down.';
            }
        }

        if (state === 'half-open') {
            console.log("Half-open state: allowing one attempt.");
        }

        try {
            // Execute the function
            const data = func(...args);

            // If successful, move to closed state
            if (state === 'half-open') {
                console.log("Service recovered. Moving to closed state.");
                state = 'closed';
            }

            // Reset the failure count on successful call
            failureCount = 0;
            return 'success data';
        } catch (error) {
            console.log(`Function failed: ${error}`);

            // If in half-open state and the function fails, move back to open
            if (state === 'half-open') {
                console.log("Service failed in half-open state. Moving to open.");
                state = 'open';
                timeSinceLastFailure = new Date(); 
                return 'Error';
            }

            failureCount++;

            // If failure threshold is exceeded, move to open state
            if (failureCount >= retriesCount) {
                console.log("Failure threshold exceeded. Circuit is open.");
                state = 'open';
                timeSinceLastFailure = new Date(); // Set the time of failure
            }
            return 'main error'
        }
    };
}

// Test function to simulate failures
function testCircuitBreaker() {
    let count = 0;
    return function () {
        if (count < 4) { // Simulate 4 failures before success
            count++;
            throw `Failed - ${count}`;
        } else {
            count = 0; // Reset count after success
            console.log('Success');
            return 'done';
        }
    };
}

const t = testCircuitBreaker();
const cb = circuitBreaker(t, 3, 300);

// Testing the circuit breaker
console.log(cb()); // Failure 1
console.log(cb()); // Failure 2
console.log(cb()); // Failure 3 (Circuit opens)
console.log(cb()); // Circuit is open, returns "Service is down."
console.log(cb()); // Circuit is open, returns "Service is down."

setTimeout(() => {
    console.log('timeout')
    console.log(cb()); // Half-open state, should succeed
}, 300); // Adjusted to match the thresholdTime


setTimeout(() => {
    console.log('timeout 2')
    console.log(cb()); // Half-open state, should succeed
}, 700);
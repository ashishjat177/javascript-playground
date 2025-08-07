
// leading -> immediately call

// Normal Execution ->
// The function executes normally if the delay has passed since the last call:

// Trailing Execution ->
// The trailing execution schedules the function to run after the delay if the function is called during the delay period:

function throttle (func, delay, {leading = true, trailing = true}) {
    let lastCall = null;
    let timeout = null;
    return (...args) => {
        const now = Date.now();

        if(leading && lastCall === null) {
            // Execute immediately if leading is true and it's the first call
            func.apply(this, args);
            console.log('called from leading')
            lastCall = now;
        } else if(now - lastCall > delay){
            // Execute if the delay has passed
            func.apply(this, args);
            lastCall = now;
            console.log('called from normal')
        } else if(!timeout && trailing) {
            // Schedule trailing execution if within the delay
            const remainingTime = delay - (now - lastCall);
            timeout = setTimeout(() => {
                func.apply(this, args);
                lastCall = Date.now();
                timeout = null;
            }, remainingTime);
        }
    }
}

// function throttle1(func, delay, options) {
//     const {leading = true, trailing = true} = options;
//     let waiting = false;
//     let lastCall = null;
//     return function throttled(...args) {
//         if(!waiting) {
//             if(leading) {
//                 func(...args);
//             }
//             waiting = true;
//             lastCall = true;
//             setTimeout(() => {
//                 waiting = false;
//                 if(lastCall) {

//                 }
//             }, delay)
//         }
//     }
// }

// const func = throttle(console.log, 1000, {leading: true});


// for(let i =0; i < 5; i++) {
//    func('func called');
// }

function throttle(fn, delay, options = { leading: true, trailing: false }) {
    const { leading, trailing } = options;
    
    let lastInvoked = 0;
    let timeout = null
    let lastArgs = null;
    let lastContext = null;

    function throttled(...args) {
        const currentTime = Date.now();
        lastArgs = args;
        lastContext = this;

        const invoke = () => {
            fn.apply(lastContext, lastArgs);
            lastInvoked = Date.now();
            lastArgs = lastContext = null
        }

        if(!leading && !lastInvoked) {
            lastInvoked = currentTime;
        }

        if(leading && !lastInvoked) {
            invoke();
        } else if(currentTime - lastInvoked > delay) {
            invoke();
        } else if(trailing && !timeout) {
            const remainingTime = delay - ( currentTime - lastInvoked);
            timeout = setTimeout(() => {
                timeout = null;
                invoke();
            }, remainingTime);
        }
    }

    return throttled;
}

const throttledFunc1 = throttle(console.log, 1000, {leading: true});

setInterval(() => {
    throttledFunc1('Throttled function 1 called');
}, 200); 


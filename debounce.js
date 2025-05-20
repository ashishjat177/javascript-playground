
function debounce(func, delay) {
    let timer;
    const context = this;
    let firstElement;
    return () => {
        clearTimeout(timer);
        setTimeout(() => {
            func.apply(context)
        }, delay);
    }
}



var callback = function() { console.log('a') };
var throttled = debounce(callback, 3);

for (let i = 0; i < 5; i++) {
  throttled();
}

assert.equal(callback.calledOnce, true);
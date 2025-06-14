
function debounce(func, delay, {leading = true}) {
    let timeout = null;
    return function debounced(...args) {
        if(leading && !timeout) {
            
        }
       clearTimeout(timeout); 
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}



var callback = function() { console.log('a') };
var throttled = debounce(callback, 3);

for (let i = 0; i < 5; i++) {
  throttled();
}
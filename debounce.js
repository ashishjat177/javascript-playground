
function debounce(func, delay, {leading = true, trailing = true}) {
    let timeout = null;
    let isLeadingInvoked = false;
    return function debounced(...args) {
      const context = this;

      if(timeout) {
        clearTimeout(timeout);
      }  

       if(leading && !timeout) {
        console.log('called with leading')
        func.apply(context, args);
        isLeadingInvoked = true;
       } else {
        isLeadingInvoked = false;
       }

        timeout = setTimeout(() => {
          if(trailing && !isLeadingInvoked) {
            console.log('called after trailing')
            func.apply(context, args);
            timeout = null;
          }
        }, delay);
    }
}



var callback = function() { console.log('a') };
var debouncedFunc = debounce(callback, 300, {leading: true, trailing: true});

for (let i = 0; i < 5; i++) {
  debouncedFunc();
}

setTimeout(() => {
  console.log('from set timeout')
  debouncedFunc();
}, 800);
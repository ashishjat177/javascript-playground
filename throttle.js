function throttle (func, delay) {
    let time = new Date();
    return () => {
        if(new Date() - time < delay ) {
            time = new Date();
            func();
        }
    }
}


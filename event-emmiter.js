class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback)
    }

    once = (eventName, callback) => {
        const onceWrapper = (...args) => {
            callback(...args);
            this.off(eventName, onceWrapper);
        }
        this.on(eventName, onceWrapper);
    }

    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback)
            if (!this.events[eventName].length) {
                delete this.events[eventName];
            }
        } else {
            console.log('event is not available')
        }
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
           this.events[eventName].forEach(cb => {
              cb(...args)
           });
        }
    }
}



 const emmiter = new EventEmitter()
 const log = (...args) => console.log(...args)
 emmiter.on('sayHello', log);
 emmiter.emit('sayHello', 'evemit');
 emmiter.once('once', () => console.log('once called'))
 emmiter.emit('once');
 emmiter.emit('once');
 emmiter.off('sayHello', log);
 emmiter.emit('sayHello');

class MyPromise {
    constructor() {

    }

    
}


function fetcher(message, delay, failIt) {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(failIt) {
                    reject(`${message} rejected ❌`)
                }else {
                    resolve(`${message} resolved ✅`)
                }
            }, delay)
       })
    }
}

const p1 = fetcher('p1', 1000, true);
const p2 = fetcher('p2', 1500);
const p3 = fetcher('p3', 500, true);


// 1. Promise.all
// 2. Promise.any
// 3. Promise.allSettle
// 4. promise.race

function myAll(promises) {
    const promiseResult = [];
    let resolveCount = 0;
    return new Promise((resolve, reject) => {
       promises.forEach((promise, index) => {
         Promise.resolve(promise).then((result) => {
                promiseResult[index] = result;
                resolveCount++;
                if(resolveCount === promises.length) {
                    resolve(promiseResult);
                }
            }).catch((err) => {
                reject(err)
            })
        });
    })
}

// const allData = Promise.all([p1(), p2(), p3()]);

// allData.then((result) => console.log(...result)).catch((err) => console.log(err))

// 2. allSettled

function myAllSettled(promises) {
    return new Promise((resolve) => {   
        const promisesResult = [];
        let count = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((result) => {
                promisesResult[index] = {status: 'fulfilled', value: result};
            }).catch((err) => {
                promisesResult[index] = {status: 'rejected', reason: err};
            }).finally(() => {
                if(count === promises.length) {
                    resolve(promisesResult);
                }
            })
        })
     })

}


function myAny(promises) {
    return new Promise((resolve, reject) => {
        let rejectCount = 0;
        const errors = [];
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((result) => {
                resolve(result);
            }).catch((err) => {
                rejectCount++;
                errors[index] = err;
                if(rejectCount === promises.length) {
                    reject(AggregateError('All promises were rejected', err));
                }
            })
        })
    });
}


function myRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            Promise.resolve(promise).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    });
}


myAny([p1(), p2(), p3()]).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err);
});




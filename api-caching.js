const cachedApiCall = (expiryTime) => {
    const cache = {};
    return async function (url, options={})  {
        const key = `${url}-${JSON.stringify(options)}`
        const entry = cache[key];
        if(!entry || (Date.now() >= entry?.ttl)) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if(response.status === 200) {
                    cache[key] = {value: data, ttl: Date.now() + expiryTime};
                    console.log('from fetch call')
                    return data;
                } else {
                    console.log('api failed')
                }
            } catch(err) {
                throw err;
            }
        } else {
            console.log('from cache')
            return cache[key].value;
        }
    }
}


const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const call = cachedApiCall(500);
call(apiUrl, {}).then((a) => console.log(a));
setTimeout(() => {
    call(apiUrl, {}).then((a) => console.log(a));
}, 800);
setTimeout(() => {
    call(apiUrl, {}).then((a) => console.log(a));
}, 1000);

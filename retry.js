const fetchData = async(url, maxRetries, delay) => {
    try {
        if(maxRetries > 1) {
            console.log('max retries', maxRetries)
            throw new Error('test retry')
        }
        const data = await fetch(url);
        const response = await data.json();
        console.log('success', response);
        return response;
    } catch(err) {
        if(maxRetries > 0) {
            console.log(err);
            await new Promise((resolve) => setTimeout(resolve, delay))
            return fetchData(url, maxRetries - 1, delay);
        } else {
            throw new Error('not successfull');
        }
    }
}

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

fetchData(apiUrl, 3, 3000)


const fetchData1 = () => {
    const controller = new AbortController();

    const fetchWrapper = async(url, maxRetries = 3, delay = 1000) => {
    try {
        const response = await fetch(url, {signal: controller.signal });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        if(maxRetries > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay))
           return fetchWrapper(url, maxRetries - 1, delay);
        } else {
            throw new Error('not successfull');
        }
    }
    }

    fetchWrapper.controller = controller
    return fetchWrapper
}

const fetchWrapper = fetchData1();

fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log('Success:', data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.warn('Fetch aborted');
    } else {
      console.error('Fetch failed:', err);
    }
  });

// Abort after 2s
setTimeout(() => {
  fetchWithRetry.controller.abort();
}, 2000);
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
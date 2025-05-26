// const { simpleFetch } = require('../simple-fetch');
import { simpleFetch } from "./simple-fetch/index.mjs";

const API_URL = {
    auth1: '/api/auth',
    auth2: '/api/2/auth'
}

class Blogs {
    constructor() {
        this.accessToken = null;
    }
    async getLatestBlog() {
        if(!this.accessToken || Date.now() >= this.accessToken.expires) {
            throw new Error('Access token is not set');
        }
        try {
            const response = await simpleFetch('/api/blog/latest', {
                method: 'GET',
                headers: {Authorization: `Bearer ${this.accessToken.token}`},
            });
            if(response.status === 200) {
                return response.response;
            }  else {
                throw new Error(response.errorMessage);
            }
        } catch(err) {
            console.log('error from fetch blogs', err);
            throw err
        }
    }

    async authenticate() {
        try {
            const response = await simpleFetch(API_URL.auth2, {
                method: 'POST',
                body: { "apiKey": "4a8e3990b0e0559b77430f4ddb28a3cb" }
            });
            if(response.status === 200) {
                this.accessToken = {token: response.response.token, ttl: response.response.expires};
                return response.response;
            } else {
                throw new Error(response.errorMessage);
            }
        } catch (err) {
            console.log('error from autheticate',err);
            throw err;
        }
    }
}

const client = new Blogs();
client.authenticate().then( async (result) => {
    if(result.token) {
        try{
            const data = await client.getLatestBlog();
            console.log(data);

            // test after expirey time
            setTimeout(async() => {
                try {
                const data = await client.getLatestBlog();
                console.log('second call', data);
                } catch (err) {
                    console.log('settimeout error', err) 
                }
            }, 3000);
        }catch(err) {
            console.log(err)
        }
    }
}).catch(err => {
    console.error('Error:', err);
});
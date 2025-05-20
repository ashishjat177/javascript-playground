// const { simpleFetch } = require('../simple-fetch');
import { simpleFetch } from "./simple-fetch/index.mjs";

class Blogs {
    constructor() {
        this.accessToken = '';
    }
    async getLatestBlog() {
        if(!this.accessToken) {
            throw new Error('Access token is not set');
        }
        try {
            const response = await simpleFetch('/api/blog/latest', {
                method: 'GET',
                headers: {Authorization: `Bearer ${this.accessToken}`},
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
            const response = await simpleFetch('/api/auth', {
                method: 'POST',
                body: { "apiKey": "4a8e3990b0e0559b77430f4ddb28a3cb" }
            });
            if(response.status === 200) {
                this.accessToken = response.response.token;
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
       const data = await client.getLatestBlog();
       console.log(data);
    }
}).catch(err => {
    console.error('Error:', err);
});
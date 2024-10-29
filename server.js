const { createServer } = require('node:http')
// const mongoose = require('mongoose');

// const User = require('./models/User')


// mongoose.connect('mongodb://localhost:27017/user_info',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("Connected to MongoDb"))
//     .catch(error => console.error("Could not connect to MongoDb",error))


const hostname = '127.0.0.1'
const port = 3000;

const server = createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if(req.method === 'POST' && req.url === '/register'){
        let body = ''

        req.on('data',chunk => {
            body += chunk.toString();
        })

        req.on('end', async() => {
            const data = JSON.parse(body);
            console.log('Received data:', data)
        })
    }

})
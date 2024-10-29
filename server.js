const { createServer } = require('node:http');
const mongoose = require('mongoose');
const User = require('./models/User');

// Konektuj se na MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/user_info')
.then(() => console.log("Connected to MongoDb"))
.catch(error => console.error("Could not connect to MongoDb", error));

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/register') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                console.log('Received data:', data);

                // Kreiraj novog korisnika
                const user = new User(data);
                await user.save();  // Sačuvaj korisnika u bazi

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'User registered successfully', data }));
            } catch (error) {
                console.error('Error saving user:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Error saving user' }));
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

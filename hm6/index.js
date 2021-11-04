const socket = require('socket.io')
const http = require('http')
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readStream.pipe(res);
});
const io = socket(server);

io.on('connection', (client) => {
    console.log('connection')

    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', data)
        client.emit('server-msg', data);
    })
})

server.listen(8080);
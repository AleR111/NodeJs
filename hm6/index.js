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

const randomUser = () => Math.floor(Math.random() * 100)

class User {
    constructor() {
        this.name = `user${randomUser()}`
    }
}

const io = socket(server);
let count = 0

io.on('connection', (client) => {
    console.log('connection')
    count++
    const user = new User()

    client.broadcast.emit('new-user', user, count)
    client.emit('new-user', user, count)

    client.on('disconnect', () => {
        count--
        client.broadcast.emit('disconnect-user', user, count)
        client.emit('disconnect-user', user, count)
    });

    client.on('client-msg', (data) => {
        data.userName = user.name
        client.broadcast.emit('server-msg', data)
        client.emit('server-msg', data);
    })
})

server.listen(8080);
const express = require("express");
var cors = require('cors');
const app = express();
var http = require('http');

var PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Routes
app.use(require("./routes/main.routes"));

app.use(express.static('client'))

var server = http.createServer(app);
server.listen(PORT)


var usuarios = {}
const socketio = require('socket.io')(server)
var barLevel = 0



socketio.on('connection',(socket)=>{
    let name = socket.handshake.query.name
    usuarios[socket.id] = name
    socketio.emit('usuarios',JSON.stringify(usuarios))
    socket.on('disconnect',()=>{
        delete usuarios[socket.id]
        socketio.emit('usuarios',JSON.stringify(usuarios))
    })
})

setInterval(()=>{
    barLevel += Object.values(usuarios).length;
    socketio.emit('LEVEL_BAR',JSON.stringify({barLevel}))
},300)

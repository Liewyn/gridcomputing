const express = require("express");
var cors = require('cors');
const app = express();
var http = require('http');



app.use(cors());
app.use(express.json());

//Routes
app.use(require("./routes/main.routes"));

var server = http.createServer(app);
server.listen(8080)

// app.listen(8080, () => {
//     console.log("app listening on this port");
// })

var usuarios = {}

const socketio = require('socket.io')(server)

socketio.on('connection',(socket)=>{
    console.log('someone connected: ' + socket.handshake.query.name)
    let name = socket.handshake.query.name
    console.log(socket.handshake.address)
    usuarios[socket.id] = name
    socket.emit('usuarios',JSON.stringify(usuarios))
})

socketio.on('disconnect',(socket)=>{
    console.log('someone disconnected')
})



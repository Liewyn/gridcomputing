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

var barLevel = 0



socketio.on('connection',(socket)=>{
    console.log('someone connected: ' + socket.handshake.query.name)
    let name = socket.handshake.query.name
    console.log(socket.handshake.address)
    usuarios[socket.id] = name
    socketio.emit('usuarios',JSON.stringify(usuarios))
    socket.on('disconnect',()=>{
        console.log('someone disconnected')
        delete usuarios[socket.id]
        socketio.emit('usuarios',JSON.stringify(usuarios))
    })
})

// socketio.on('disconnect',(socket)=>{
//     console.log('someone disconnected')
//     delete usuarios[socket.id]
// })

setInterval(()=>{
    barLevel += Object.values(usuarios).length;
    
    console.log({barLevel})
    socketio.emit('LEVEL_BAR',JSON.stringify({barLevel}))
},300)

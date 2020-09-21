import io from 'socket.io-client'

let urlSite = 'http://localhost:5000'

let  users = {}
let levelBar = 0;

let socket;

export function connectSocket(name){
  //alert('connecting to socket')
  
  
  if(socket){
    if(socket.connected){
    }else{
      socket.connect(urlSite,{query: `name=${name}`});
    }
    return;
  }
  else {
    socket = io.connect(urlSite,{query: `name=${name}`});
  }

  socket.on('connect',()=>{
    console.log('Connected')
  })

  socket.on('usuarios',(data)=>{
    console.log(Object.values(JSON.parse(data)))
    users = JSON.parse(data)
  })

  socket.on('LEVEL_BAR',(data)=>{
    levelBar = JSON.parse(data).barLevel
  })

  //socket.on('usuarios',(data)=>{
}

export function getUsers(){
  return users;
}

export function getLevelBar(){
  return levelBar
}
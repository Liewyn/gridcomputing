import io from 'socket.io-client'

let urlSite = 'http://localhost:8080'


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
  })
}

